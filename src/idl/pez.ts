export type Pez = {
    version: "0.1.0";
    name: "pez";
    instructions: [
        {
            name: "createPez";
            accounts: [
                {
                    name: "dispenser";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "gatekeeper";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "candyShaft";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "ownerCandyVault";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "owner";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "systemProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "tokenProgram";
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: "params";
                    type: {
                        defined: "CreatePezParams";
                    };
                }
            ];
        },
        {
            name: "updatePez";
            accounts: [
                {
                    name: "dispenser";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "owner";
                    isMut: true;
                    isSigner: true;
                }
            ];
            args: [
                {
                    name: "params";
                    type: {
                        defined: "UpdatePezParams";
                    };
                }
            ];
        },
        {
            name: "loadPez";
            accounts: [
                {
                    name: "dispenser";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "gatekeeper";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "candyShaft";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "ownerCandyVault";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "owner";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "tokenProgram";
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: "params";
                    type: {
                        defined: "LoadPezParams";
                    };
                }
            ];
        },
        {
            name: "emptyPez";
            accounts: [
                {
                    name: "dispenser";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "gatekeeper";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "candyShaft";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "ownerCandyVault";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "owner";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "tokenProgram";
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: "params";
                    type: {
                        defined: "EmptyPezParams";
                    };
                }
            ];
        },
        {
            name: "takePez";
            accounts: [
                {
                    name: "dispenser";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "gatekeeper";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "candyShaft";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "takerCandyVault";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "taker";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "tokenProgram";
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [];
        }
    ];
    accounts: [
        {
            name: "pezDispenser";
            type: {
                kind: "struct";
                fields: [
                    {
                        name: "name";
                        type: "string";
                    },
                    {
                        name: "dispenser";
                        type: "publicKey";
                    },
                    {
                        name: "owner";
                        type: "publicKey";
                    },
                    {
                        name: "gatekeeper";
                        type: "publicKey";
                    },
                    {
                        name: "nonce";
                        type: "u8";
                    },
                    {
                        name: "candyMint";
                        type: "publicKey";
                    },
                    {
                        name: "candyShaft";
                        type: "publicKey";
                    },
                    {
                        name: "candyPerWallet";
                        type: "u64";
                    },
                    {
                        name: "candyPerPull";
                        type: "u64";
                    },
                    {
                        name: "candyTaken";
                        type: "u64";
                    }
                ];
            };
        }
    ];
    types: [
        {
            name: "CreatePezParams";
            type: {
                kind: "struct";
                fields: [
                    {
                        name: "nonce";
                        type: "u8";
                    },
                    {
                        name: "amountToLoad";
                        type: "u64";
                    },
                    {
                        name: "name";
                        type: "string";
                    },
                    {
                        name: "candyPerWallet";
                        type: "u64";
                    },
                    {
                        name: "candyPerPull";
                        type: "u64";
                    }
                ];
            };
        },
        {
            name: "UpdatePezParams";
            type: {
                kind: "struct";
                fields: [
                    {
                        name: "name";
                        type: "string";
                    },
                    {
                        name: "candyPerWallet";
                        type: "u64";
                    },
                    {
                        name: "candyPerPull";
                        type: "u64";
                    }
                ];
            };
        },
        {
            name: "LoadPezParams";
            type: {
                kind: "struct";
                fields: [
                    {
                        name: "amountToLoad";
                        type: "u64";
                    }
                ];
            };
        },
        {
            name: "EmptyPezParams";
            type: {
                kind: "struct";
                fields: [
                    {
                        name: "amountToEmpty";
                        type: "u64";
                    }
                ];
            };
        },
        {
            name: "ErrorCode";
            type: {
                kind: "enum";
                variants: [
                    {
                        name: "CouldNotTX";
                    },
                    {
                        name: "NotEnoughToLoad";
                    },
                    {
                        name: "NotEnoughCandy";
                    },
                    {
                        name: "OnlyTakeX";
                    },
                    {
                        name: "NameTooLong";
                    },
                    {
                        name: "NeedCandyPerPull";
                    },
                    {
                        name: "NeedCandyPerWallet";
                    },
                    {
                        name: "BadGateKeeper";
                    }
                ];
            };
        }
    ];
};

export const IDL: Pez = {
    version: "0.1.0",
    name: "pez",
    instructions: [
        {
            name: "createPez",
            accounts: [
                {
                    name: "dispenser",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "gatekeeper",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "candyShaft",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "ownerCandyVault",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "owner",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "tokenProgram",
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: "params",
                    type: {
                        defined: "CreatePezParams",
                    },
                },
            ],
        },
        {
            name: "updatePez",
            accounts: [
                {
                    name: "dispenser",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "owner",
                    isMut: true,
                    isSigner: true,
                },
            ],
            args: [
                {
                    name: "params",
                    type: {
                        defined: "UpdatePezParams",
                    },
                },
            ],
        },
        {
            name: "loadPez",
            accounts: [
                {
                    name: "dispenser",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "gatekeeper",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "candyShaft",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "ownerCandyVault",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "owner",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "tokenProgram",
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: "params",
                    type: {
                        defined: "LoadPezParams",
                    },
                },
            ],
        },
        {
            name: "emptyPez",
            accounts: [
                {
                    name: "dispenser",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "gatekeeper",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "candyShaft",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "ownerCandyVault",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "owner",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "tokenProgram",
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: "params",
                    type: {
                        defined: "EmptyPezParams",
                    },
                },
            ],
        },
        {
            name: "takePez",
            accounts: [
                {
                    name: "dispenser",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "gatekeeper",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "candyShaft",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "takerCandyVault",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "taker",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "tokenProgram",
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [],
        },
    ],
    accounts: [
        {
            name: "pezDispenser",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "name",
                        type: "string",
                    },
                    {
                        name: "dispenser",
                        type: "publicKey",
                    },
                    {
                        name: "owner",
                        type: "publicKey",
                    },
                    {
                        name: "gatekeeper",
                        type: "publicKey",
                    },
                    {
                        name: "nonce",
                        type: "u8",
                    },
                    {
                        name: "candyMint",
                        type: "publicKey",
                    },
                    {
                        name: "candyShaft",
                        type: "publicKey",
                    },
                    {
                        name: "candyPerWallet",
                        type: "u64",
                    },
                    {
                        name: "candyPerPull",
                        type: "u64",
                    },
                    {
                        name: "candyTaken",
                        type: "u64",
                    },
                ],
            },
        },
    ],
    types: [
        {
            name: "CreatePezParams",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "nonce",
                        type: "u8",
                    },
                    {
                        name: "amountToLoad",
                        type: "u64",
                    },
                    {
                        name: "name",
                        type: "string",
                    },
                    {
                        name: "candyPerWallet",
                        type: "u64",
                    },
                    {
                        name: "candyPerPull",
                        type: "u64",
                    },
                ],
            },
        },
        {
            name: "UpdatePezParams",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "name",
                        type: "string",
                    },
                    {
                        name: "candyPerWallet",
                        type: "u64",
                    },
                    {
                        name: "candyPerPull",
                        type: "u64",
                    },
                ],
            },
        },
        {
            name: "LoadPezParams",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "amountToLoad",
                        type: "u64",
                    },
                ],
            },
        },
        {
            name: "EmptyPezParams",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "amountToEmpty",
                        type: "u64",
                    },
                ],
            },
        },
        {
            name: "ErrorCode",
            type: {
                kind: "enum",
                variants: [
                    {
                        name: "CouldNotTX",
                    },
                    {
                        name: "NotEnoughToLoad",
                    },
                    {
                        name: "NotEnoughCandy",
                    },
                    {
                        name: "OnlyTakeX",
                    },
                    {
                        name: "NameTooLong",
                    },
                    {
                        name: "NeedCandyPerPull",
                    },
                    {
                        name: "NeedCandyPerWallet",
                    },
                    {
                        name: "BadGateKeeper",
                    },
                ],
            },
        },
    ],
};
