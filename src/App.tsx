import { Connection, PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import ReactXnft, {
    Text,
    View,
    Button,
    Image,
    usePublicKey,
    useConnection,
} from "react-xnft";
import {
    getPezProgram,
    getTotalReminders,
    takePez,
    YAL_PEZ_ID,
} from "./modules/controller";

//
// On connection to the host environment, warm the cache.
//
ReactXnft.events.on("connect", () => {
    console.log("Hi mom!");
});

const MINT_SUCCESS_MESSAGE = "+3 Reminders in your wallet!";
const MINT_ERROR_MESSAGE = "Uh Oh! There was an error minting!";

export interface YalState {
    isMinting: boolean;
    mint: () => void;
    amount: number;
    message: string | null;
}
export function useYalState(): YalState {
    const connection = useConnection() as Connection;
    const publicKey = usePublicKey() as PublicKey;
    const program = getPezProgram();
    const [amount, setAmount] = useState<number>(0);
    const [isMinting, setIsMinting] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);

    const updateAmount = () => {
        getTotalReminders(connection).then((reminders) => {
            setAmount(reminders);
        });
    };

    const mint = () => {
        setIsMinting(true);
        takePez(program, connection, YAL_PEZ_ID, publicKey)
            .then(() => {
                updateAmount();
                setMessage(MINT_SUCCESS_MESSAGE);
            })
            .catch((e) => {
                console.log(e);
                setMessage(MINT_ERROR_MESSAGE);
            })
            .finally(() => {
                setIsMinting(false);
            });
    };

    useEffect(() => {
        updateAmount();
    }, []);

    useEffect(() => {
        if (message) {
            setTimeout(() => {
                setMessage(null);
                updateAmount();
            }, 3000);
        }
    }, [message]);

    return {
        mint,
        amount,
        isMinting,
        message,
    };
}

export interface RenderMintReminderProps {
    onMint: () => void;
    isMinting: boolean;
    message: string | null;
}
export function RenderMintReminder(props: RenderMintReminderProps) {
    const { onMint, isMinting, message } = props;

    const messageColor = message === MINT_ERROR_MESSAGE ? "#D92950" : "#00FF00";
    const buttonMessage = isMinting ? "Minting..." : "Mint Reminder";

    const onClick = () => {
        if (!isMinting && !message) {
            onMint();
        }
    };

    return (
        <View
            style={{
                position: "absolute",
                bottom: "3vh",
                width: "100%",
                textAlign: "center",
                zIndex: "50",
            }}
        >
            <Text
                style={{
                    fontSize: "small",
                    color: messageColor,
                    marginBottom: "1vh",
                }}
            >
                {message ?? ""}
            </Text>
            <Button onClick={onClick}>{buttonMessage}</Button>
        </View>
    );
}

export interface RenderHeartProps {
    remindersMinted?: number;
}
export function RenderHeart(props: RenderHeartProps) {
    const { remindersMinted } = props;

    return (
        <View
            style={{
                width: "100%",
                textAlign: "center",
                paddingTop: "3vh",
            }}
        >
            <Text
                style={{
                    fontSize: "200%",
                }}
            >
                You Are Loved.
            </Text>
            <Text style={{}}>{remindersMinted} Reminders Minted.</Text>
            <Image
                style={{
                    marginTop: "3vh",
                    display: "block",
                    borderRadius: "10px",
                    width: "335px",
                    height: "335px",
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
                src="https://shdw-drive.genesysgo.net/6P6WznKbJ2nEMCfrXZDQvipCgCSx45SXxjWMWvqfPtyJ/yal_image.png"
            />
        </View>
    );
}

export function App() {
    const { amount, mint, isMinting, message } = useYalState();

    return (
        <View
            style={{
                height: "100%",
                backgroundColor: "#130910",
                width: "100%",
            }}
        >
            {RenderHeart({
                remindersMinted: amount,
            })}

            {RenderMintReminder({
                message,
                isMinting,
                onMint: mint,
            })}
        </View>
    );
}
