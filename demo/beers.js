/**
 * Beer Management System
 * A comprehensive example showcasing JavaScript syntax highlighting
 */

// Constants and configuration
const BEER_TYPES = {
  IPA: 'India Pale Ale',
  LAGER: 'Lager',
  STOUT: 'Stout',
  PORTER: 'Porter',
  WHEAT: 'Wheat Beer',
  SOUR: 'Sour Ale'
};

const DEFAULT_TEMPERATURE = 4; // Celsius
const MAX_INVENTORY = 1000;

/**
 * Represents a beer in the inventory
 */
class Beer {
  #privateId; // Private field

  constructor(name, type, abv, ibu, brewery) {
    this.#privateId = Math.random().toString(36).substr(2, 9);
    this.name = name;
    this.type = type;
    this.abv = abv; // Alcohol by volume
    this.ibu = ibu; // International Bitterness Units
    this.brewery = brewery;
    this.inStock = true;
    this.temperature = DEFAULT_TEMPERATURE;
  }

  get id() {
    return this.#privateId;
  }

  get description() {
    return `${this.name} - ${this.type} (${this.abv}% ABV, ${this.ibu} IBU)`;
  }

  set stockStatus(status) {
    this.inStock = Boolean(status);
  }

  /**
   * Adjusts the serving temperature
   * @param {number} temp - Temperature in Celsius
   * @returns {boolean} Success status
   */
  adjustTemperature(temp) {
    if (temp < 0 || temp > 20) {
      console.warn(`Temperature ${temp}°C is out of range`);
      return false;
    }
    this.temperature = temp;
    return true;
  }

  /**
   * Checks if beer is properly chilled
   */
  isProperlyChilled() {
    const idealTemp = this.type === BEER_TYPES.LAGER ? 4 : 7;
    return Math.abs(this.temperature - idealTemp) <= 2;
  }

  toString() {
    return this.description;
  }
}

/**
 * Manages beer inventory and operations
 */
class BeerInventory {
  constructor() {
    this.beers = new Map();
    this.sales = [];
    this.initialized = false;
  }

  /**
   * Adds a new beer to inventory
   */
  addBeer(beer) {
    if (!(beer instanceof Beer)) {
      throw new TypeError('Expected Beer instance');
    }

    if (this.beers.size >= MAX_INVENTORY) {
      throw new Error('Inventory is full');
    }

    this.beers.set(beer.id, beer);
    console.log(`Added: ${beer.description}`);
    return beer.id;
  }

  /**
   * Finds beers matching criteria
   */
  findBeers({ type = null, minAbv = 0, maxAbv = 100, inStockOnly = true } = {}) {
    return Array.from(this.beers.values()).filter(beer => {
      const typeMatch = !type || beer.type === type;
      const abvMatch = beer.abv >= minAbv && beer.abv <= maxAbv;
      const stockMatch = !inStockOnly || beer.inStock;

      return typeMatch && abvMatch && stockMatch;
    });
  }

  /**
   * Records a beer sale
   */
  async sellBeer(beerId, quantity = 1) {
    const beer = this.beers.get(beerId);

    if (!beer) {
      throw new Error(`Beer ${beerId} not found`);
    }

    if (!beer.inStock) {
      throw new Error(`${beer.name} is out of stock`);
    }

    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 100));

    const sale = {
      beerId,
      beerName: beer.name,
      quantity,
      timestamp: new Date(),
      total: quantity * this.calculatePrice(beer)
    };

    this.sales.push(sale);
    console.log(`Sold ${quantity}x ${beer.name} for $${sale.total.toFixed(2)}`);

    return sale;
  }

  /**
   * Calculates beer price based on ABV and IBU
   */
  calculatePrice(beer) {
    const basePrice = 5.00;
    const abvMultiplier = beer.abv * 0.25;
    const ibuMultiplier = beer.ibu * 0.02;

    return basePrice + abvMultiplier + ibuMultiplier;
  }

  /**
   * Gets sales statistics
   */
  getStatistics() {
    const totalSales = this.sales.reduce((sum, sale) => sum + sale.total, 0);
    const totalQuantity = this.sales.reduce((sum, sale) => sum + sale.quantity, 0);

    return {
      totalSales: totalSales.toFixed(2),
      totalQuantity,
      averagePrice: totalQuantity > 0 ? (totalSales / totalQuantity).toFixed(2) : 0,
      beerCount: this.beers.size
    };
  }

  /**
   * Exports inventory to JSON
   */
  exportToJSON() {
    const data = {
      beers: Array.from(this.beers.values()).map(beer => ({
        id: beer.id,
        name: beer.name,
        type: beer.type,
        abv: beer.abv,
        ibu: beer.ibu,
        brewery: beer.brewery,
        inStock: beer.inStock
      })),
      sales: this.sales,
      exportDate: new Date().toISOString()
    };

    return JSON.stringify(data, null, 2);
  }
}

// Utility functions
const formatBeerList = (beers) => {
  return beers.map((beer, index) =>
    `${index + 1}. ${beer.description} - ${beer.brewery}`
  ).join('\n');
};

const calculateAverageABV = (...beers) => {
  if (beers.length === 0) return 0;
  const total = beers.reduce((sum, beer) => sum + beer.abv, 0);
  return (total / beers.length).toFixed(2);
};

// Arrow functions and array methods
const filterByType = (beers, type) => beers.filter(b => b.type === type);
const sortByABV = (beers) => [...beers].sort((a, b) => b.abv - a.abv);
const getBeerNames = (beers) => beers.map(b => b.name);

// Demo usage
function initializeDemo() {
  const inventory = new BeerInventory();

  // Create sample beers
  const beers = [
    new Beer('Hazy Sunset', BEER_TYPES.IPA, 6.5, 65, 'Craft Brewing Co.'),
    new Beer('Golden Pilsner', BEER_TYPES.LAGER, 4.8, 35, 'Traditional Brewery'),
    new Beer('Midnight Stout', BEER_TYPES.STOUT, 8.2, 45, 'Dark Horse Brewing'),
    new Beer('Citrus Wheat', BEER_TYPES.WHEAT, 5.2, 20, 'Summer Ales Inc.'),
    new Beer('Funky Sour', BEER_TYPES.SOUR, 4.5, 10, 'Wild Fermentation')
  ];

  // Add beers to inventory
  beers.forEach(beer => inventory.addBeer(beer));

  // Find IPAs
  const ipas = inventory.findBeers({ type: BEER_TYPES.IPA });
  console.log('IPAs in stock:', formatBeerList(ipas));

  // Find high ABV beers
  const strongBeers = inventory.findBeers({ minAbv: 7 });
  console.log(`\nStrong beers (>7% ABV): ${strongBeers.length}`);

  // Calculate average ABV
  const avgAbv = calculateAverageABV(...beers);
  console.log(`\nAverage ABV: ${avgAbv}%`);

  // Simulate sales
  (async () => {
    try {
      await inventory.sellBeer(beers[0].id, 2);
      await inventory.sellBeer(beers[2].id, 1);

      const stats = inventory.getStatistics();
      console.log('\nSales Statistics:', stats);

      // Export data
      const jsonData = inventory.exportToJSON();
      console.log('\nExported inventory data');
    } catch (error) {
      console.error('Error during sales:', error.message);
    }
  })();

  return inventory;
}

// Template literals and tagged templates
function beerTag(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i] !== undefined ? values[i] : '';
    return result + str + value;
  }, '');
}

const recommendBeer = (beer) => beerTag`
  🍺 Recommendation: ${beer.name}
  Type: ${beer.type}
  ABV: ${beer.abv}%
  Perfect for: ${beer.isProperlyChilled() ? 'immediate serving' : 'needs chilling'}
`;

// Destructuring and spread operator
const { IPA, STOUT, LAGER } = BEER_TYPES;
const popularTypes = [IPA, STOUT, LAGER];

// Optional chaining and nullish coalescing
const getBeerInfo = (inventory, beerId) => {
  const beer = inventory?.beers?.get(beerId);
  return beer?.description ?? 'Beer not found';
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    Beer,
    BeerInventory,
    BEER_TYPES,
    initializeDemo,
    formatBeerList,
    calculateAverageABV
  };
}

// Initialize if running directly
if (typeof window !== 'undefined') {
  window.beerInventory = initializeDemo();
} else {
  console.log('Beer Management System loaded');
}
