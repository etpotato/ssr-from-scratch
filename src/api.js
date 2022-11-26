import fetch from 'node-fetch';

export default {
  getProduct: async (id) => {
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(`${res.status}. ${data?.message || res.statusText}`);
      }
      return {
        product: { [data.id]: data },
      };
    } catch (err) {
      console.error('api error');
      throw err;
    }
  },

  getProducts: async () => {
    try {
      const res = await fetch('https://dummyjson.com/products/?limit=20');
      const data = await res.json();
      if (!res.ok) {
        throw new Error(`${res.status}. ${data?.message || res.statusText}`);
      }
      return data;
    } catch (err) {
      console.error('api error');
      throw err;
    }
  },
};
