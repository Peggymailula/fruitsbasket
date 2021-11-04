let assert = require("assert");
let TheFruitBasket = require("../services/fruitBasket");
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/fruitbasket_test';

const pool = new Pool({
    connectionString
});

describe('The balloon function', function () {


    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query('delete from fruit_basket;');
      
        
    });

    it('should find the fruit baskets for Mango fruit', async function () {
        

        const fruitB = TheFruitBasket(pool);
        await fruitB.newBasket('Apple',4.50,5);
        await fruitB.newBasket('Orange',4.00, 8);
        await fruitB.newBasket('Mango',6.90, 7);
    
        assert.deepEqual([
            {
              fruittype: 'Mango',
              qty: 7
            }
          ]
            ,await fruitB.getFruit('Mango'));

    });

    it('should find the fruit baskets for Orange fruit', async function () {
        

        const fruitB = TheFruitBasket(pool);
        await fruitB.newBasket('Apple',4.50,5);
        await fruitB.newBasket('Orange',4.00, 8);
        await fruitB.newBasket('Mango',6.90, 7);
    
        assert.deepEqual([
            {
              fruittype: 'Orange',
              qty: 8
            }
          ]
            ,await fruitB.getFruit('Orange'));

    });


    it('should update the quantity for the  two pears added to the Pear basket', async function () {
        

        const fruitB = TheFruitBasket(pool);
        await fruitB.newBasket('Apple',4.50,5);
        await fruitB.newBasket('Orange',4.00, 8);
        await fruitB.newBasket('Mango',6.90, 7);
        await fruitB.newBasket('Pear',4.60, 10);

        await fruitB.addFruit('Pear');
        await fruitB.addFruit('Pear');
    
        assert.equal(12
            ,await fruitB.getQuantity('Pear'));

    });

    it('should update the quantity for three apples added to Apple basket', async function () {

        const fruitB = TheFruitBasket(pool);
        await fruitB.newBasket('Apple',4.50,5);
        await fruitB.newBasket('Orange',4.00, 8);
        await fruitB.newBasket('Mango',6.90, 7);
        await fruitB.newBasket('Pear',4.60, 10);

        await fruitB.addFruit('Apple');
        await fruitB.addFruit('Apple');
        await fruitB.addFruit('Apple');
    
        assert.equal(8
            ,await fruitB.getQuantity('Apple'));
      

    });
    it('should update the quantity for the  two pears added to the Pear basket', async function () {
        

        const fruitB = TheFruitBasket(pool);
        await fruitB.newBasket('Apple',4.50,5);
        await fruitB.newBasket('Orange',4.00, 8);
        await fruitB.newBasket('Mango',6.90, 7);
        await fruitB.newBasket('Pear',4.60, 10);

    
        assert.equal(4.60
            ,await fruitB.getPrice('Pear'));

    });

    it('should return the price of Mango basket', async function () {

        const fruitB = TheFruitBasket(pool);
        await fruitB.newBasket('Apple',4.50,5);
        await fruitB.newBasket('Orange',4.00, 8);
        await fruitB.newBasket('Mango',6.90, 7);
        await fruitB.newBasket('Pear',4.60, 10);

        
    
        assert.equal(6.90
            ,await fruitB.getPrice('Mango'));
      

    })
    it('should return the total price for all oranges without new fruits added to the orange basket', async function () {

        const fruitB = TheFruitBasket(pool);
        await fruitB.newBasket('Apple',4.50,5);
        await fruitB.newBasket('Orange',4.00, 8);
        await fruitB.newBasket('Mango',6.90, 7);
        await fruitB.newBasket('Pear',4.60, 10);

    
    
        assert.equal(32
            ,await fruitB.totalPrice('Orange'));
      

    });
    it('should return the total price for all apples without new fruits added to the apple basket', async function () {

        const fruitB = TheFruitBasket(pool);
        await fruitB.newBasket('Apple',4.50,5);
        await fruitB.newBasket('Orange',4.00, 8);
        await fruitB.newBasket('Mango',6.90, 7);
        await fruitB.newBasket('Pear',4.60, 10);

        await fruitB.addFruit('Apple');
        await fruitB.addFruit('Apple');
        await fruitB.addFruit('Apple');
    
        assert.equal(36
            ,await fruitB.totalPrice('Apple'));
      

    })


    // it('an invalid color should become a valid color after 5 requests', async function () {

    //     const theBalloonShop = TheBalloonShop(pool, []);

    //     assert.equal([], await theBalloonShop.getValidColors());

    //     await theBalloonShop.requestColor('Blue')
    //     await theBalloonShop.requestColor('Blue')
    //     await theBalloonShop.requestColor('Red')
    //     await theBalloonShop.requestColor('Blue')
    //     await theBalloonShop.requestColor('Blue')

    //     assert.deepEqual(['Blue', 'Red'], theBalloonShop.getInValidColors());

    //     await theBalloonShop.requestColor('Blue')

    //     assert.deepEqual(['Blue'], await theBalloonShop.getValidColors());
    //     assert.deepEqual(['Red'], await theBalloonShop.getInValidColors());

    // });

    after(function () {
        pool.end();
    })
});