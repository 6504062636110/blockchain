async function main() {
    // const accounts = await ethers.provider.listAccounts();
    // const balance = await ethers.provider.getBalance(accounts[0]); // ตรวจสอบบัญชีแรก
    // console.log(ethers.utils.formatEther(balance), "ETH");
    const RecycleCreditToken =
        await ethers.getContractFactory("RecycleCreditToken");
    // Start deployment, returning a promise that resolves to a contract object
    const recycleCreditToken = await RecycleCreditToken.deploy(
        "0x9c44BA38c007FB4918b31584B61ff25A1d57669C",
    );
    console.log("Contract deployed to address:", recycleCreditToken.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
