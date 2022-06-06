
export const getTokenTransactionsForWallet = async (walletAddress) => {
    if (!walletAddress)
        return [];

    const endpoint = `${process.env.REACT_APP_BSCSCAN_API_BASE_URL}/api?module=account&action=tokentx&address=${walletAddress}&startblock=986632&endblock=99999999999999&sort=asc&apikey=${process.env.REACT_APP_BSCSCAN_API_KEY}`;
    const getTransactions = await fetch(endpoint);
    if (!getTransactions.ok)
        return [];

    const transactions = await getTransactions.json();

    const contractTransactions = [];
    for (let i = 0; i < transactions.result.length; i++) {
        const t = transactions.result[i];
        if (t.contractAddress.toLowerCase() != process.env.REACT_APP_CONTRACT_ADDRESS.toLowerCase())
            continue;

        if (t.to.toLowerCase() == walletAddress.toLowerCase()) {
            t.direction = 'in';
            contractTransactions.push(t);
        }
        else if (t.from.toLowerCase == walletAddress.toLowerCase()) {
            t.direction = 'out';
            contractTransactions.push(t);
        }
    }

    return contractTransactions;
}