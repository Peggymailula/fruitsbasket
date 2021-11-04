module.exports = (pool) =>  {


    async function newBasket(type,qty,price){
        await pool.query('INSERT INTO fruit_basket (fruitType, price, qty) VALUES ($1,$2,$3)',[type,qty, price]); 
    }

   async function getFruit(fruit){
     const fruits =   await pool.query('SELECT fruitType,qty FROM fruit_basket WHERE fruitType = $1',[fruit]);
     return fruits.rows;
   }

   async function getPrice(fruits){
   let allPrices =  await pool.query('SELECT price FROM fruit_basket WHERE fruitType = $1',[fruits]);
    allPrices =  allPrices.rows;   
  const price =  allPrices.map(function (obj) {
      return  obj.price;
    });
   // console.log(price[0])
return price[0];
   }
   async function getQuantity(fruity){
    let allQty =  await pool.query('SELECT qty FROM fruit_basket WHERE fruitType = $1',[fruity]);
    allQty =  allQty.rows;   
    let qty = allQty.map(function (obj) {
      return  obj.qty;
    });
    return qty[0]
   
       
}

   async function addFruit(newFruit){
      
       var noDuplicate = await pool.query('SELECT fruitType FROM fruit_basket WHERE fruitType = $1', [newFruit]);

       if (noDuplicate.rowCount !== 0) {

        await pool.query('UPDATE fruit_basket SET  qty= qty + 1 WHERE fruitType = $1', [newFruit]);
       }
    }

      async function totalPrice(fruit){
        let price = await getPrice(fruit);
        let qty = await getQuantity(fruit);
        const total = price * qty;
       // console.log(price*qty);
         //console.log(price);

       return total

      }

   

    return {
        newBasket,
        getFruit,
        addFruit,
        getPrice,
        getQuantity,
        totalPrice
       
    }
}