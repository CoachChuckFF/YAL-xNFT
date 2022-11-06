import { BN, Program } from "@project-serum/anchor";
import {
    createAssociatedTokenAccountInstruction,
    getAssociatedTokenAddress,
} from "@solana/spl-token";
import { ConfirmOptions, Connection, PublicKey } from "@solana/web3.js";
import { Pez, IDL } from "../idl/pez";

// --------- DEFINES -----------------------------------------
export const PEZ_PROGRAM_ID = new PublicKey(
    "GiJzLSGDvPMN7JGJsFxfuDoe8rnhAMEQGcMVEnDmgQbx"
);
export const YAL_PEZ_ID = new PublicKey(
    "4rMer1B8rJBmSYecJmAJbBdooXDrjX8V3ofcT2dFWRqp"
);
export const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey(
    "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
);
export const TOKEN_PROGRAM_ID = new PublicKey(
    "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
);

export interface PezDispenser {
    name: string;
    dispenser: PublicKey;
    owner: PublicKey;
    gatekeeper: PublicKey;
    nonce: number;
    candyMint: PublicKey;
    candyShaft: PublicKey;
    candyPerWallet: BN;
    candyPerPull: BN;
    candyTaken: BN;
}

export function getTotalReminders(connection: Connection) {
    return new Promise<number>((resolve) => {
        connection
            .getAccountInfo(YAL_PEZ_ID)
            .then((account) => {
                const reminders = new BN(
                    new Uint8Array(
                        account?.data.buffer.slice(192, 192 + 8) as ArrayBuffer
                    ),
                    10,
                    "le"
                );
                resolve(reminders.toNumber());
            })
            .catch((e) => {
                console.log(e);
                resolve(0);
            });
    });
}

export function getPezProgram() {
    return new Program<Pez>(IDL, PEZ_PROGRAM_ID, window.xnft.solana);
}

export async function getPezDispenser(
    program: Program<Pez>,
    pezKey: PublicKey | PezDispenser,
    shouldUpdate?: boolean
) {
    if ((pezKey as PezDispenser).nonce) {
        if (shouldUpdate) {
            return (await program.account.pezDispenser.fetch(
                (pezKey as PezDispenser).dispenser
            )) as PezDispenser;
        } else {
            return (await pezKey) as PezDispenser;
        }
    }
    return (await program.account.pezDispenser.fetch(
        pezKey as PublicKey
    )) as PezDispenser;
}

export const takePez = async (
    program: Program<Pez>,
    connection: Connection,
    pezKey: PublicKey,
    taker: PublicKey,
    opts?: ConfirmOptions
) => {
    const pez = await getPezDispenser(program, pezKey);

    const vault = await getAssociatedTokenAddress(pez.candyMint, taker);
    let shouldCreate = false;

    try {
        const probeAccount = await connection.getAccountInfo(vault);
        if (!probeAccount) {
            shouldCreate = true;
        }
    } catch (e) {
        shouldCreate = true;
    }

    await program.methods
        .takePez()
        .accounts({
            dispenser: pez.dispenser,
            gatekeeper: pez.gatekeeper,
            candyShaft: pez.candyShaft,
            takerCandyVault: vault,
            taker: taker,
            tokenProgram: TOKEN_PROGRAM_ID,
        })
        .preInstructions([
            ...(shouldCreate
                ? [
                      createAssociatedTokenAccountInstruction(
                          taker,
                          vault,
                          taker,

                          pez.candyMint
                      ),
                  ]
                : []),
        ])
        .rpc({
            skipPreflight: true,
            ...opts,
        });
};
