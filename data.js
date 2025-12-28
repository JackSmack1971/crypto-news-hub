// Mock Data for Crypto News Hub

// Cryptocurrency Data for Ticker and Market Sections
export const cryptoData = [
    { symbol: 'BTC', name: 'Bitcoin', price: 52347.89, change: 2.34, icon: '₿' },
    { symbol: 'ETH', name: 'Ethereum', price: 3456.12, change: 1.56, icon: 'Ξ' },
    { symbol: 'SOL', name: 'Solana', price: 145.67, change: -0.45, icon: '◎' },
    { symbol: 'BNB', name: 'Binance', price: 456.78, change: 0.23, icon: '◈' },
    { symbol: 'ADA', name: 'Cardano', price: 1.23, change: -1.12, icon: '₳' },
    { symbol: 'XRP', name: 'Ripple', price: 0.67, change: 0.89, icon: '✕' },
    { symbol: 'DOT', name: 'Polkadot', price: 8.90, change: -2.34, icon: '●' },
    { symbol: 'DOGE', name: 'Dogecoin', price: 0.12, change: 5.67, icon: 'Ð' }
];

// Top Gainers (24h)
export const topGainers = [
    { rank: 1, name: 'Pepe', symbol: 'PEPE', change: 45.67 },
    { rank: 2, name: 'Bonk', symbol: 'BONK', change: 32.45 },
    { rank: 3, name: 'Jupiter', symbol: 'JUP', change: 28.90 },
    { rank: 4, name: 'Render', symbol: 'RNDR', change: 25.34 },
    { rank: 5, name: 'Fetch.ai', symbol: 'FET', change: 21.67 }
];

// Market Movers
export const marketMovers = [
    { name: 'Bitcoin', price: '$52,347', change: 2.34, color: '#f7931a' },
    { name: 'Ethereum', price: '$3,456', change: 4.56, color: '#627eea' },
    { name: 'Solana', price: '$142.56', change: -2.34, color: '#00ffa3' },
    { name: 'BNB', price: '$589.23', change: 1.23, color: '#f3ba2f' },
    { name: 'Ripple', price: '$0.68', change: 0.45, color: '#23292f' }
];

// Trending Topics
export const trendingTopics = [
    { tag: 'Bitcoin ETF', count: 12500 },
    { tag: 'DeFi Summer', count: 8900 },
    { tag: 'NFT Collections', count: 7200 },
    { tag: 'Layer 2 Solutions', count: 6800 },
    { tag: 'RWA Tokenization', count: 5400 },
    { tag: 'CBDC Updates', count: 4900 },
    { tag: 'Metaverse', count: 4200 },
    { tag: 'Web3 Gaming', count: 3800 }
];

// Category mapping for display
export const categoryNames = {
    'all': 'All News',
    'defi': 'DeFi',
    'nft': 'NFTs',
    'regulation': 'Regulation',
    'market': 'Markets',
    'technology': 'Technology'
};

// News Articles
export const newsArticles = [
    {
        id: 1,
        title: 'Bitcoin Surges Past $50K as Institutional Interest Grows',
        excerpt: 'Major financial institutions are increasingly showing interest in cryptocurrency investments, driving prices to new heights. BlackRock, Fidelity, and other giants continue to expand their crypto offerings.',
        category: 'market',
        author: 'Sarah Chen',
        date: 'Dec 29, 2025',
        readTime: '5 min',
        image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80',
        trending: true,
        content: `
            <p>Major financial institutions are increasingly showing interest in cryptocurrency investments, driving prices to new heights. BlackRock, Fidelity, and other giants continue to expand their crypto offerings.</p>
            <p>The recent surge in Bitcoin's price above $50,000 has been attributed to a combination of factors, including the approval of spot Bitcoin ETFs and the upcoming halving event. Institutional inflows have reached record levels, signaling a shift in perception of digital assets from speculative instruments to a legitimate asset class.</p>
            <h3>Key Drivers</h3>
            <ul>
                <li>Spot ETF Approvals</li>
                <li>Institutional Adoption</li>
                <li>Macro-economic Hedges</li>
            </ul>
            <p>"This is just the beginning," says Sarah Chen, lead analyst at CryptoSphere. "We are seeing a fundamental repricing of the asset class."</p>
        `
    },
    {
        id: 2,
        title: 'New DeFi Protocol Revolutionizes Lending Standards',
        excerpt: 'A groundbreaking decentralized lending protocol has been launched, promising lower fees and higher security for users. The protocol utilizes a novel collateral mechanism.',
        category: 'defi',
        author: 'Mike Ross',
        date: 'Dec 28, 2025',
        readTime: '4 min',
        image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
        trending: true
    },
    {
        id: 3,
        title: 'Global Regulators Meet to Discuss Crypto Framework',
        excerpt: 'Representatives from 20 countries are gathering to establish a unified regulatory framework for digital assets. The focus will be on consumer protection and anti-money laundering.',
        category: 'regulation',
        author: 'Emma Wilson',
        date: 'Dec 28, 2025',
        readTime: '6 min',
        image: 'https://images.unsplash.com/photo-1526304640152-d46196bfc4c8?w=800&q=80',
        trending: false
    },
    {
        id: 4,
        title: 'NFT Market Volume Hits Monthly High',
        excerpt: 'Trading volume in the NFT sector has rebounded strongly, led by blue-chip collections and gaming assets. New utility-focused projects are driving renewed interest.',
        category: 'nft',
        author: 'Alex Wong',
        date: 'Dec 27, 2025',
        readTime: '3 min',
        image: 'https://images.unsplash.com/photo-1620321023374-d1a68fddadb3?w=800&q=80',
        trending: true
    },
    {
        id: 5,
        title: 'Ethereum Layer 2 Solutions See Record TVL',
        excerpt: 'Total Value Locked in Ethereum scaling solutions has reached a new all-time high as gas fees on the mainnet remain elevated. Arbitrum and Optimism lead the charge.',
        category: 'technology',
        author: 'David Miller',
        date: 'Dec 27, 2025',
        readTime: '5 min',
        image: 'https://images.unsplash.com/photo-1622630998477-20aa696fab05?w=800&q=80',
        trending: false
    },
    {
        id: 6,
        title: 'Top 5 Altcoins to Watch in Q1 2026',
        excerpt: 'Analysts predict strong performance for these emerging altcoins in the coming quarter based on technical developments. Fundamental analysis suggests undervaluation.',
        category: 'market',
        author: 'Lisa Park',
        date: 'Dec 26, 2025',
        readTime: '7 min',
        image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&q=80',
        trending: true
    },
    {
        id: 7,
        title: 'Web3 Gaming: The Next Frontier?',
        excerpt: 'Major game studios are quietly experimenting with blockchain technology despite gamer pushback. We explore what the future holds for the intersection of gaming and crypto.',
        category: 'technology',
        author: 'Tom Baker',
        date: 'Dec 26, 2025',
        readTime: '8 min',
        image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80',
        trending: false
    },
    {
        id: 8,
        title: 'Central Bank Digital Currencies: Progress Report',
        excerpt: 'Over 80% of central banks are now exploring CBDCs. We look at the status of the Digital Euro, Digital Dollar, and e-CNY pilot programs.',
        category: 'regulation',
        author: 'James Wilson',
        date: 'Dec 25, 2025',
        readTime: '6 min',
        image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=800&q=80',
        trending: false
    }
];
