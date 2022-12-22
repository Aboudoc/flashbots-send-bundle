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

    const signedBundle = flashbotsProvider.signBundle([
        {
            signedTransaction: SIGNED_ORACLE_UPDATE_FROM_PENDING_POOL, // serialized signed transaction hex
        },
        {
            signer: wallet, // ethers signer
            transaction: transaction, // ethers populated transaction object
        },
    ])

    const bundleReceipt = await flashbotsProvider.sendRawBundle(
        signedBundle, // bundle we signed above
        targetBlockNumber, // block number at which this bundle is valid
        {
            minTimestamp, // optional minimum timestamp at which this bundle is valid (inclusive)
            maxTimestamp, // optional maximum timestamp at which this bundle is valid (inclusive)
            revertingTxHashes: [tx1, tx2], // optional list of transaction hashes allowed to revert. Without specifying here, any revert invalidates the entire bundle.
        }
    )
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
