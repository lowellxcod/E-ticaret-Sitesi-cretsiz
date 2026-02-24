async function main() {
    try {
        const res = await fetch('http://localhost:3000/api/admin/transactions');
        const text = await res.text();
        console.log('--- API Response ---');
        console.log(`Status: ${res.status}`);
        console.log(text);
        console.log('--------------------');
    } catch (err) {
        console.error('Fetch error:', err);
    }
}

main();
