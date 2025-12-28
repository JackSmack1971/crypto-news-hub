// Mock Data for Crypto News Hub

// Cryptocurrency Data for Ticker and Market Sections
const cryptoData = [
    { symbol: 'BTC', name: 'Bitcoin', price: 52347.89, change: 2.34, icon: '₿' },
    { symbol: 'ETH', name: 'Ethereum', price: 3456.78, change: 4.56, icon: 'Ξ' },
    { symbol: 'BNB', name: 'BNB', price: 589.23, change: 1.23, icon: 'B' },
    { symbol: 'SOL', name: 'Solana', price: 142.56, change: -2.34, icon: 'S' },
    { symbol: 'XRP', name: 'XRP', price: 0.6789, change: 0.45, icon: 'X' },
    { symbol: 'ADA', name: 'Cardano', price: 0.5678, change: -1.23, icon: 'A' },
    { symbol: 'DOGE', name: 'Dogecoin', price: 0.1234, change: 5.67, icon: 'Ð' },
    { symbol: 'AVAX', name: 'Avalanche', price: 45.67, change: 3.21, icon: 'A' },
    { symbol: 'DOT', name: 'Polkadot', price: 7.89, change: -0.45, icon: 'D' },
    { symbol: 'MATIC', name: 'Polygon', price: 0.987, change: 2.34, icon: 'M' },
    { symbol: 'LINK', name: 'Chainlink', price: 14.56, change: 1.89, icon: '⬡' },
    { symbol: 'UNI', name: 'Uniswap', price: 6.78, change: -3.21, icon: 'U' },
    { symbol: 'ATOM', name: 'Cosmos', price: 9.87, change: 0.67, icon: 'A' },
    { symbol: 'LTC', name: 'Litecoin', price: 89.45, change: 1.45, icon: 'Ł' },
    { symbol: 'NEAR', name: 'NEAR Protocol', price: 3.45, change: 4.56, icon: 'N' },
    { symbol: 'APT', name: 'Aptos', price: 8.90, change: -1.23, icon: 'A' },
    { symbol: 'ARB', name: 'Arbitrum', price: 1.23, change: 2.89, icon: 'A' },
    { symbol: 'OP', name: 'Optimism', price: 2.56, change: -0.89, icon: 'O' },
    { symbol: 'INJ', name: 'Injective', price: 23.45, change: 6.78, icon: 'I' },
    { symbol: 'SUI', name: 'Sui', price: 3.67, change: 1.23, icon: 'S' }
];

// Top Gainers (24h)
const topGainers = [
    { rank: 1, name: 'Pepe', symbol: 'PEPE', change: 45.67 },
    { rank: 2, name: 'Bonk', symbol: 'BONK', change: 32.45 },
    { rank: 3, name: 'Jupiter', symbol: 'JUP', change: 28.90 },
    { rank: 4, name: 'Render', symbol: 'RNDR', change: 25.34 },
    { rank: 5, name: 'Fetch.ai', symbol: 'FET', change: 21.67 }
];

// Market Movers
const marketMovers = [
    { name: 'Bitcoin', price: '$52,347', change: 2.34, color: '#f7931a' },
    { name: 'Ethereum', price: '$3,456', change: 4.56, color: '#627eea' },
    { name: 'Solana', price: '$142.56', change: -2.34, color: '#00ffa3' },
    { name: 'BNB', price: '$589.23', change: 1.23, color: '#f3ba2f' },
    { name: 'Ripple', price: '$0.68', change: 0.45, color: '#23292f' }
];

// Trending Topics
const trendingTopics = [
    { tag: 'Bitcoin ETF', count: 12500 },
    { tag: 'DeFi Summer', count: 8900 },
    { tag: 'NFT Collections', count: 7200 },
    { tag: 'Layer 2 Solutions', count: 6800 },
    { tag: 'RWA Tokenization', count: 5400 },
    { tag: 'CBDC Updates', count: 4900 },
    { tag: 'Metaverse', count: 4200 },
    { tag: 'Web3 Gaming', count: 3800 }
];

// News Articles
const newsArticles = [
    {
        id: 1,
        title: 'Bitcoin Surges Past $50K as Institutional Interest Grows',
        excerpt: 'Major financial institutions are increasingly showing interest in cryptocurrency investments, driving prices to new heights. BlackRock, Fidelity, and other giants continue to expand their crypto offerings.',
        category: 'market',
        author: 'Sarah Chen',
        date: 'December 29, 2025',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&h=500&fit=crop',
        featured: true
    },
    {
        id: 2,
        title: 'Ethereum Layer 2 Solutions See Record Adoption in Q4',
        excerpt: 'Arbitrum, Optimism, and other Layer 2 protocols record unprecedented transaction volumes as users seek lower fees and faster confirmation times.',
        category: 'technology',
        author: 'Michael Torres',
        date: 'December 28, 2025',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=500&fit=crop'
    },
    {
        id: 3,
        title: 'DeFi Protocol TVL Reaches All-Time High of $120 Billion',
        excerpt: 'Total value locked in decentralized finance protocols hits new milestone as institutional capital flows into the sector. Leading protocols see unprecedented growth.',
        category: 'defi',
        author: 'Emma Williams',
        date: 'December 28, 2025',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&h=500&fit=crop'
    },
    {
        id: 4,
        title: 'SEC Signals Potential Shift in Crypto Regulation Approach',
        excerpt: 'New regulatory framework could provide clearer guidelines for cryptocurrency exchanges and token issuers, signaling a more cooperative approach from US regulators.',
        category: 'regulation',
        author: 'David Kim',
        date: 'December 27, 2025',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop'
    },
    {
        id: 5,
        title: 'NFT Market Shows Signs of Recovery with Blue Chip Collections',
        excerpt: 'After a prolonged downturn, NFT trading volumes increase significantly as major brands and artists launch new collections.',
        category: 'nft',
        author: 'Lisa Park',
        date: 'December 27, 2025',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800&h=500&fit=crop'
    },
    {
        id: 6,
        title: 'Solana Ecosystem Expands with New DeFi Applications',
        excerpt: 'Multiple new protocols launch on Solana, attracting significant TVL and user activity. The network advantages continue to draw developers.',
        category: 'defi',
        author: 'James Rodriguez',
        date: 'December 26, 2025',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&h=500&fit=crop'
    },
    {
        id: 7,
        title: 'Central Banks Accelerate CBDC Development Programs',
        excerpt: 'Multiple countries advance their digital currency initiatives as central bank cooperation increases. Cross-border payment solutions show promise.',
        category: 'regulation',
        author: 'Anna Müller',
        date: 'December 26, 2025',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop'
    },
    {
        id: 8,
        title: 'Bitcoin Mining Industry Shifts Toward Sustainable Energy',
        excerpt: 'Major mining operations increasingly adopt renewable energy sources as the industry responds to environmental concerns and regulatory pressure.',
        category: 'technology',
        author: 'Robert Johnson',
        date: 'December 25, 2025',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1621973832871-6f3db1f3a8fb?w=800&h=500&fit=crop'
    },
    {
        id: 9,
        title: 'Web3 Gaming Token Values Surge as Player Base Grows',
        excerpt: 'Play-to-earn and play-and-earn gaming models attract millions of users, with in-game asset values reaching new highs.',
        category: 'nft',
        author: 'Sophie Taylor',
        date: 'December 25, 2025',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=500&fit=crop'
    },
    {
        id: 10,
        title: 'Institutional Adoption Drives Growth in Crypto Custody Services',
        excerpt: 'Major financial institutions expand their digital asset custody offerings as demand from institutional investors continues to grow.',
        category: 'market',
        author: 'William Chen',
        date: 'December 24, 2025',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=500&fit=crop'
    },
    {
        id: 11,
        title: 'Cross-Chain Bridge Solutions Gain Traction',
        excerpt: 'Interoperability protocols see increased usage as users seek to move assets between different blockchain networks securely.',
        category: 'technology',
        author: 'Jennifer Lee',
        date: 'December 24, 2025',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=500&fit=crop'
    },
    {
        id: 12,
        title: 'Real World Asset Tokenization Market Expands',
        excerpt: 'Traditional financial institutions explore tokenization of real-world assets including real estate, bonds, and commodities on blockchain networks.',
        category: 'defi',
        author: 'Thomas Brown',
        date: 'December 23, 2025',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?w=800&h=500&fit=crop'
    },
    {
        id: 13,
        title: 'Global Crypto Regulations Take Shape',
        excerpt: 'International bodies work toward coordinated approach to cryptocurrency regulation as countries finalize their frameworks.',
        category: 'regulation',
        author: 'Maria Garcia',
        date: 'December 23, 2025',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=500&fit=crop'
    },
    {
        id: 14,
        title: 'Bitcoin Options Market Matures with New Products',
        excerpt: 'Institutional-grade derivatives products launch on major exchanges as sophisticated trading strategies gain popularity.',
        category: 'market',
        author: 'Alex Thompson',
        date: 'December 22, 2025',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1611974765270-ca1258634369?w=800&h=500&fit=crop'
    },
    {
        id: 15,
        title: 'Ethereum Name Service (ENS) Adoption Accelerates',
        excerpt: 'Web3 domain registrations surge as users recognize the value of readable blockchain addresses and decentralized identity.',
        category: 'technology',
        author: 'Kevin Zhang',
        date: 'December 22, 2025',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&h=500&fit=crop'
    }
];

// Category mapping for display
const categoryNames = {
    all: 'All News',
    defi: 'DeFi',
    nft: 'NFTs',
    regulation: 'Regulation',
    market: 'Markets',
    technology: 'Technology'
};

// Export data for use in app.js
window.cryptoData = cryptoData;
window.topGainers = topGainers;
window.marketMovers = marketMovers;
window.trendingTopics = trendingTopics;
window.newsArticles = newsArticles;
window.categoryNames = categoryNames;
