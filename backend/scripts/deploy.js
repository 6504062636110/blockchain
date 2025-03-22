async function main() {
    // const accounts = await ethers.provider.listAccounts();
    // const balance = await ethers.provider.getBalance(accounts[0]); // ตรวจสอบบัญชีแรก
    // console.log(ethers.utils.formatEther(balance), "ETH");
    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    // Start deployment, returning a promise that resolves to a contract object
    const hello_world = await HelloWorld.deploy("Hello World!");
    console.log("Contract deployed to address:", hello_world.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
