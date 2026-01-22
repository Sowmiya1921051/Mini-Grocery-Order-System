const API_URL = 'http://localhost:5000/api';

async function verify() {
    try {
        console.log('--- Step 1: Adding product "Test Item" ($10, stock 5) ---');
        const res1 = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Test Item', price: 10, stock: 5 })
        });
        const data1 = await res1.json();
        console.log('Result 1:', data1.message, 'Price:', data1.product.price);

        console.log('\n--- Step 2: Restocking "Test Item" with new price ($12, +10 stock) ---');
        const res2 = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Test Item', price: 12, stock: 10 })
        });
        const data2 = await res2.json();
        console.log('Result 2:', data2.message, 'New Price:', data2.product.price, 'Total Stock:', data2.product.stock);

        if (data2.product.price === 12 && data2.product.stock === 15) {
            console.log('✅ Price and Stock updated correctly.');
        } else {
            console.log('❌ Update failed.');
        }

        console.log('\n--- Step 3: Placing order via NAME "Test Item" (qty 2) ---');
        const res3 = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productName: 'Test Item', quantity: 2 })
        });
        const data3 = await res3.json();
        console.log('Result 3:', data3.message, 'Order details:', data3.order);

        if (res3.ok) {
            console.log('✅ Name-based ordering works.');
        } else {
            console.log('❌ Name-based ordering failed.');
        }

    } catch (error) {
        console.error('Verification Error:', error.message);
    }
}

verify();
