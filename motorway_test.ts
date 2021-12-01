//cache to store numberplates and their prices
let cache = new Map();

//function to add a numberPlate and its price to the cache
let addToCache = (key: string,val: any) => {
  if(!cache.has(key)){
    cache.set(key,val);
  }
}

// function to retrieve the price from the cache
const getFromCache = async(numberPlate: string) => {
    const price = await cache.get(numberPlate);
    return price;
}


const getPrice = async (numberPlate: string, skipCacheForRead: boolean = true) => {
  
  //if the numberPlate and its price are cached, return its price
  if(cache.has(numberPlate)){
    const price = await getFromCache(numberPlate);
    return price;
  }

  //fetch the price from the api
  const pricePromise = await getExternalPrice(numberPlate);

  // add the numberPlate and price promise to the cache which will be resolved when the price is fetched from the api
  addToCache(numberPlate,pricePromise);

  const price = await getFromCache(numberPlate);
  return price;
}

let test_val = new Map();

//values used as test
test_val.set('123',23.5).set('124',50).set('125',19).set('126',78);

//mock function to retrieve prices
function getExternalPrice(numberPlate: string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(test_val.get(numberPlate));
    }, 1000);
  });
}


getPrice('123');
getPrice('123');