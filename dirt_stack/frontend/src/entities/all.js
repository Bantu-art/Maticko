// Base Entity class for common functionality
class BaseEntity {
  constructor(data = {}) {
    Object.assign(this, data);
  }

  static async request(method, endpoint, data = null) {
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`/api${endpoint}`, config);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${method} ${endpoint}`, error);
      throw error;
    }
  }
}

// User entity
export class User extends BaseEntity {
  static async me() {
    try {
      return await this.request('GET', '/user/me');
    } catch (error) {
      // Return mock user for development
      return {
        id: 1,
        email: 'user@example.com',
        name: 'Demo User'
      };
    }
  }

  static async login() {
    // Mock login for development
    console.log('Login functionality would be implemented here');
    return {
      id: 1,
      email: 'user@example.com',
      name: 'Demo User'
    };
  }
}

// Product entity
export class Product extends BaseEntity {
  static async list(orderBy = '-created_date', limit = 100) {
    try {
      return await this.request('GET', `/products?order=${orderBy}&limit=${limit}`);
    } catch (error) {
      // Return all Naivas products data (converted from KES to USD at ~130 KES = 1 USD)
      const naivasProducts = [
        { id: 1, name: "Naivas Kitchen Towel 2 Ply 1 Roll", price: 1.28, description: "Naivas Kitchen Towel 2 Ply 1 Roll", image_url: "https://d16zmt6hgq1jhj.cloudfront.net/product/6952/aNz8Y72iUFeXUIXab7LYgzSAB5X1D2hQptVmArdd.png", category: "household_cleaning", brand: "Naivas", sku: "15509595", on_sale: false },
        { id: 2, name: "Naivas Premium Toilet Tissue 2 Ply 4 Rolls", price: 1.39, description: "Naivas Premium Toilet Tissue 2 Ply 4 Rolls", image_url: "https://d16zmt6hgq1jhj.cloudfront.net/product/3095/Yp8fGQ5qLN43XvwbHQgFRO2069vrsE2LvkxVDDuL.png", category: "household_cleaning", brand: "Naivas", sku: "15509522", on_sale: false },
        { id: 3, name: "Naivas Premium Toilet Tissue 2 Ply 10 Rolls", price: 3.85, description: "Naivas Premium Toilet Tissue 2 Ply 10 Rolls", image_url: "https://d16zmt6hgq1jhj.cloudfront.net/product/3094/CPLVez6Nh3oJmoUcvbslq7sVa69WyD1e1tymzdLx.png", category: "household_cleaning", brand: "Naivas", sku: "15509524", on_sale: false },
        { id: 4, name: "Colgate Herbal Salt Toothpaste 140g", price: 2.62, description: "Colgate Herbal Salt Toothpaste 140g", image_url: "https://d16zmt6hgq1jhj.cloudfront.net/product/28840/ZLXargxKOmD2cIXDeGb54TZ2AOSWacMEOov8M3KX.jpg", category: "health_beauty", brand: "Colgate", sku: "29000032", on_sale: false },
        { id: 5, name: "Colgate Herbal Salt Toothpaste 70g", price: 1.38, description: "Colgate Herbal Salt Toothpaste 70g", image_url: "https://d16zmt6hgq1jhj.cloudfront.net/product/28841/SRH3m5wcl0q5ODRM03DBlp8NfSKihk9FNs8yBC7C.jpg", category: "health_beauty", brand: "Colgate", sku: "29000089", on_sale: false },
        { id: 6, name: "Colgate Herbal Toothpaste 140g", price: 2.62, description: "Colgate Herbal Strong Teeth & Healthy Gums Toothpaste - 140g", image_url: "https://d16zmt6hgq1jhj.cloudfront.net/product/4966/54wLVO3R6FDsn5n4BdQcXjGMpN7mHhaMJCgy6N6C.png", category: "health_beauty", brand: "Colgate", sku: "29003263", on_sale: false },
        { id: 7, name: "Colgate Herbal Toothpaste 70g", price: 1.38, description: "Colgate Toothpaste Herbal 70g", image_url: "https://d16zmt6hgq1jhj.cloudfront.net/product/12449/qAI1J7PZuFaAKgOYLy77T2qZeh3cfDQp12Zmh6S0.png", category: "health_beauty", brand: "Colgate", sku: "29003264", on_sale: false },
        { id: 8, name: "Colgate Total 12 Hour Advanced Whitening 75ml", price: 3.46, description: "Colgate® Total® Whitening paste protects sensitive teeth while whitening for a brighter smile", image_url: "https://d16zmt6hgq1jhj.cloudfront.net/product/12444/nvsPscK8aZyJaaEJcOqGR0IvD4r0Imdg4U0IHgav.png", category: "health_beauty", brand: "Colgate", sku: "29003101", on_sale: false },
        { id: 9, name: "Colgate Total 12 Hour Clean Mint 75ml", price: 3.46, description: "Colgate Total 12 Hour Germ Protection Clean Mint Whole Mouth Protection Toothpaste", image_url: "https://d16zmt6hgq1jhj.cloudfront.net/product/12443/usXSCx8r7KlgNSu6Wx6x5TOVySZZEFqb9yGBrQCo.png", category: "health_beauty", brand: "Colgate", sku: "29000039", on_sale: false },
        { id: 10, name: "Colgate Total Charcoal Deep Clean 75ml", price: 3.46, description: "Colgate Total 12 Hour Germ Protection Charcoal Deep Clean Toothpaste", image_url: "https://d16zmt6hgq1jhj.cloudfront.net/product/23508/qfiL7LBs7pXdyGGcMynedq6jCNumiQBTRfuW9viJ.png", category: "health_beauty", brand: "Colgate", sku: "29003292", on_sale: false },
        { id: 11, name: "Sunrice Basmati Rice 5Kg", price: 12.30, description: "Delicately aromatic and soft, Sunrice basmati Rice 5kg is a classic versatile rice suitable for a variety of meals", image_url: "https://d16zmt6hgq1jhj.cloudfront.net/product/3961/Sunrice Basmati Rice 5Kg.jpg", category: "pantry_staples", brand: "Sunrice", sku: "19500705", on_sale: false },
        { id: 12, name: "Avena Vegetable Oil 5L", price: 9.81, description: "Avena Vegetable Oil 5L", image_url: "https://d16zmt6hgq1jhj.cloudfront.net/product/1488/Avena Vegetable Oil 5L.jpg", category: "pantry_staples", brand: "Avena", sku: "10500483", on_sale: false },
        { id: 13, name: "Fresh Fri Vegetable Oil 5L", price: 9.15, description: "Fresh Fri Vegetable Oil 5L", image_url: "https://d16zmt6hgq1jhj.cloudfront.net/product/4219/Fresh Fri Vegetable Oil 5L.jpg", category: "pantry_staples", brand: "Fresh Fri", sku: "10500178", on_sale: false },
        { id: 14, name: "Colgate Triple Action Toothpaste 140g", price: 1.92, description: "Colgate Triple-Action Original Mint 140g", image_url: "https://d16zmt6hgq1jhj.cloudfront.net/product/3015/HB0tsSJ8Y0mTba8XucTkItgDTA3Z1HaH6JhqRx4t.jpg", category: "health_beauty", brand: "Colgate", sku: "29003261", on_sale: false },
        { id: 15, name: "Tusker Malt Can 500ml Pack of 6", price: 12.92, description: "Tusker Malt Can 500ml Pack of 6", image_url: "https://d16zmt6hgq1jhj.cloudfront.net/product/28713/cJ8Cj2mJdDsI8aP9O1Gsmi5UgBqAQ0v5ywzJ0qCB.jpg", category: "beverages", brand: "Tusker", sku: "tuskermalt6pack", on_sale: false },
        { id: 16, name: "Naivas Kitchen Towel Twin Pink", price: 2.58, description: "Naivas Kitchen Towel Twin Pink", image_url: "https://d16zmt6hgq1jhj.cloudfront.net/product/29012/FORlWuXNUf0kEXBwI7Ywp1fYrcUeB1wJvHmKEgJQ.png", category: "household_cleaning", brand: "Naivas", sku: "15509596", on_sale: false },
        { id: 17, name: "Tupike Maize Meal 2Kg", price: 1.05, description: "The staple of ugali and other maize flour recipes. Fortified with Vitamins and Minerals", image_url: "https://d16zmt6hgq1jhj.cloudfront.net/product/3888/IFYOPBlFcitMHDs8aKJJhqUKCj2b62rvOBOHQILD.jpg", category: "pantry_staples", brand: "Tupike", sku: "11500690", on_sale: false },
        { id: 18, name: "Balozi Lager Can 500Ml Pack Of 24", price: 42.46, description: "Balozi Lager Can 500Ml Pack Of 24 Pieces", image_url: "https://d16zmt6hgq1jhj.cloudfront.net/product/28911/SsaM0oRt1fDFno58Iy83QAS57V41JL6zOjtx5Rb1.png", category: "beverages", brand: "Balozi", sku: "balozi24pac", on_sale: false },
        { id: 19, name: "Guinness Can 500Ml Pack Of 24", price: 46.15, description: "Guinness Can 500Ml Pack Of 24 Pieces", image_url: "https://d16zmt6hgq1jhj.cloudfront.net/product/28908/b0tq6jg8UrcKsZlS19cfIppxdc7ts8vv9xaafeQh.jpg", category: "beverages", brand: "Guinness", sku: "Guiness24pack", on_sale: false },
        { id: 20, name: "Tusker Cider Can 500ml Pack of 6", price: 12.46, description: "Tusker Cider Can 500ml Pack of 6", image_url: "https://d16zmt6hgq1jhj.cloudfront.net/product/28695/m6P1Hp818kMVKuJ3S9OpPEMGhQkQ3PgxlN7ha52P.jpg", category: "beverages", brand: "Tusker", sku: "Cider6pack", on_sale: false },
        { id: 21, name: "Nivea Skin Firming Lotion 400ML Q10", price: 4.50, description: "Nivea Lotion Natural Fairness 400ml", image_url: "https://d16zmt6hgq1jhj.cloudfront.net/product/4792/JiqJVHptYHkSOXSEKtRXdeGESwad1zX9PZpoB84w.png", category: "health_beauty", brand: "Nivea", sku: "15023589", on_sale: false },
        { id: 22, name: "Nivea Lotion Nourishing 400ml", price: 4.92, description: "Nivea Lotion Nourishing 400ml", image_url: "https://d16zmt6hgq1jhj.cloudfront.net/product/4796/Nivea Lotion Nourishing 400ml.jpg", category: "health_beauty", brand: "Nivea", sku: "nivea400ml", on_sale: false },
        { id: 23, name: "Tuzo Whole Milk 500Ml Fino", price: 0.38, description: "Tuzo Whole Milk 500Ml Fino", image_url: "https://d16zmt6hgq1jhj.cloudfront.net/product/3134/mIyRPa11BIJER0WdT0p8sTmSvZ6nztodg2Ewj8mj.jpg", category: "dairy_eggs", brand: "Tuzo", sku: "18004332", on_sale: false },
        { id: 24, name: "Balozi Lager 500ml Pack of 6", price: 10.62, description: "Balozi Lager 500ml Pack of 6", image_url: "https://d16zmt6hgq1jhj.cloudfront.net/product/7152/ow7VqvLFozyDUxMviE1rh7BMboU80BMFqaBHBwSj.jpg", category: "beverages", brand: "Balozi", sku: "Balozi6pack", on_sale: false },
        { id: 25, name: "Jogoo Maize Meal 2Kg", price: 1.26, description: "JOGOO MAIZE MEAL 2KG, Wholesome Meals For A Healthy Family", image_url: "https://d16zmt6hgq1jhj.cloudfront.net/product/1693/Jogoo Maize Meal 2Kg.jpg", category: "pantry_staples", brand: "Jogoo", sku: "11500048", on_sale: false },
        { id: 26, name: "White Cap Can 500Ml Pack of 6", price: 11.54, description: "White Cap Can 500Ml Pack of 6", image_url: "https://d16zmt6hgq1jhj.cloudfront.net/product/28569/ERedJZgf8OKbbuypOjhWRWF4VUVVXyNkCcXoCxFY.jpg", category: "beverages", brand: "White Cap", sku: "white6pack", on_sale: false },
        { id: 27, name: "Tusker Lager 500Ml Pack of 6", price: 10.62, description: "Tusker Lager Pack of 6", image_url: "https://d16zmt6hgq1jhj.cloudfront.net/product/28178/E1ZOPs41pe09KtW5n5UcBGsdLhmsE4PImFSzf5CM.jpg", category: "beverages", brand: "Tusker", sku: "Tusker6pack", on_sale: false },
        { id: 28, name: "Tusker Lite Can 500ml Pack of 6", price: 12.92, description: "Tusker Lite Can 500ml Pack of 6", image_url: "https://d16zmt6hgq1jhj.cloudfront.net/product/28714/iFsZRLgLZkD5oez6UwW2YmdpCeuwvfmoaO8lLWci.jpg", category: "beverages", brand: "Tusker", sku: "tuskerlite6pack", on_sale: false },
        { id: 29, name: "Mangoes Ngowe P/Kg", price: 0.76, description: "Mangoes Ngowe P/Kg", image_url: "https://d16zmt6hgq1jhj.cloudfront.net/product/1438/Mangoes Ngowe P-Kg.jpg", category: "fresh_produce", brand: "Fresh", sku: "2035392000000", on_sale: false },
        { id: 30, name: "Ramtons RM-582 Electric Pressure Cooker", price: 91.54, description: "4 digit LED display, Pressure indicator, 6 liter capacity cooking pot", image_url: "https://d16zmt6hgq1jhj.cloudfront.net/product/17294/RAMTONS RM-582 ELECTRIC P-COOKER.jpg", category: "household_cleaning", brand: "Ramtons", sku: "N034428", on_sale: false },
        { id: 31, name: "Mika 2 Door Fridge NF 202L", price: 392.27, description: "3D Cooling, Wide voltage tolerance 187V-250V, Deodorizer, Twist Ice tray provided", image_url: "https://d16zmt6hgq1jhj.cloudfront.net/product/28736/EEvgrGdvPWP5RYkknqMRCgHd75XH9yK3fl3VPil4.jpg", category: "household_cleaning", brand: "Mika", sku: "N006433", on_sale: false },
        { id: 32, name: "Rina Vegetable Oil 5L", price: 9.96, description: "Rina Vegetable Oil 5L", image_url: "https://d16zmt6hgq1jhj.cloudfront.net/product/3193/Rina Vegetable Oil 5L.jpg", category: "pantry_staples", brand: "Rina", sku: "10500069", on_sale: false },
        { id: 33, name: "Daawat Biryani Rice 5Kg", price: 9.42, description: "Daawat Biryani Rice 5kg is a combination of long grain and aromatic rice with appetizing aroma", image_url: "https://d16zmt6hgq1jhj.cloudfront.net/product/1539/Daawat Biryani Rice 1Kg.jpg", category: "pantry_staples", brand: "Daawat", sku: "19500738", on_sale: false },
        { id: 34, name: "Daima UHT Fino Bora 500Ml", price: 0.37, description: "Daima UHT Fino Bora 500 Ml", image_url: "https://d16zmt6hgq1jhj.cloudfront.net/product/503/Daima Uht Fino Bora 500 Ml.jpg", category: "dairy_eggs", brand: "Daima", sku: "N010988", on_sale: false },
        { id: 35, name: "Snapp Apple 330Ml Can Pack of 6", price: 9.69, description: "Snapp Apple 330Ml Can Pack of 6", image_url: "https://d16zmt6hgq1jhj.cloudfront.net/product/28568/mZ63Dx1cm3cp52laDsWx5AUgj1R8sjJ4UNM6JqTJ.jpg", category: "beverages", brand: "Snapp", sku: "snappackof6", on_sale: false }
      ];
      
      return limit ? naivasProducts.slice(0, limit) : naivasProducts;
    }
  }

  static async get(id) {
    try {
      return await this.request('GET', `/products/${id}`);
    } catch (error) {
      return null;
    }
  }
}

// CartItem entity
export class CartItem extends BaseEntity {
  static async filter(params) {
    try {
      const queryString = new URLSearchParams(params).toString();
      return await this.request('GET', `/cart?${queryString}`);
    } catch (error) {
      // Return mock cart items for development
      return [
        {
          id: 1,
          user_email: params.user_email,
          product_id: 1,
          quantity: 2
        },
        {
          id: 2,
          user_email: params.user_email,
          product_id: 2,
          quantity: 1
        }
      ];
    }
  }

  static async create(data) {
    try {
      return await this.request('POST', '/cart', data);
    } catch (error) {
      console.log('Mock: Cart item created', data);
      return { id: Date.now(), ...data };
    }
  }

  static async update(id, data) {
    try {
      return await this.request('PUT', `/cart/${id}`, data);
    } catch (error) {
      console.log('Mock: Cart item updated', id, data);
      return { id, ...data };
    }
  }

  static async delete(id) {
    try {
      return await this.request('DELETE', `/cart/${id}`);
    } catch (error) {
      console.log('Mock: Cart item deleted', id);
      return { success: true };
    }
  }
}

// Order entity
export class Order extends BaseEntity {
  static async create(data) {
    try {
      return await this.request('POST', '/orders', data);
    } catch (error) {
      console.log('Mock: Order created', data);
      return { 
        id: Date.now(), 
        ...data,
        created_date: new Date().toISOString()
      };
    }
  }

  static async list(userEmail) {
    try {
      return await this.request('GET', `/orders?user_email=${userEmail}`);
    } catch (error) {
      return [];
    }
  }

  static async get(id) {
    try {
      return await this.request('GET', `/orders/${id}`);
    } catch (error) {
      return null;
    }
  }
}