const ethers = require("ethers")
const { FlashbotsBundleProvider } = require("@flashbots/ethers-provider-bundle")

const PRIVATE_KEY = process.env.PRIVATE_KEY
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL

async function main() {
    const authSigner = new ethers.Wallet(PRIVATE_KEY)
    // add a signer to send transaction from
    // add a tx
    const provider = new ethers.providers.JsonRpcProvider(GOERLI_RPC_URL)
    const flashbotsProvider = await FlashbotsBundleProvider.create(
        provider,
        authSigner
    )

    // Create Bundle
    const blockNumber = await provider.getBlockNumber()
    const minTimestamp = await provider.getBlock(blockNumber).timestamp
    const maxTimestamp = minTimestamp + 120

    const signBundle = await flashbotsProvider.signBundle([
        {
            signer: SOME_SIGNER_TO_SEND_FROM,
            transaction: SOME_TRANSACTION_TO_SEND,
        },
    ])

    const bundleReceipt = await flashbotsProvider.sendRawBundle(
        signBundle,
        TARGET_BLOCK_NUMBER
    )
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
