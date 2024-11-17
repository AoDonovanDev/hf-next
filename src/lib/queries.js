import { sql } from "@vercel/postgres";
import { getDay } from "date-fns";
import { unstable_noStore } from "next/cache";

export async function addCake( { 
  cakeSize,
  cakeType, 
  cakeFlavor, 
  frostingFlavor, 
  frostingType, 
  fillingType,
  fillingFlavor, 
  other,
  writeInCakeFlavor,
  writeInFrostingFlavor,
  bows,
  discoBalls,
  freshFruit,
  glitterCherries,
  preferences,
  imgUrl
  } ) {
    try {
      const cake = await sql`
      INSERT INTO Cakes
      (cake_size, cake_type, cake_flavor, frosting_flavor, frosting_type, filling_type, other, filling_flavor, 
       write_in_cake_flavor, write_in_frosting_flavor, bows, disco_balls, fresh_fruit, glitter_cherries, preferences, reference_img)
      VALUES (${cakeSize}, ${cakeType}, ${cakeFlavor}, ${frostingFlavor}, ${frostingType}, ${fillingType}, ${other}, ${fillingFlavor}, 
      ${writeInCakeFlavor}, ${writeInFrostingFlavor}, ${bows}, ${discoBalls}, ${freshFruit}, ${glitterCherries}, ${preferences}, ${imgUrl}) RETURNING id;
    `
    return cake;
    } catch(err) {
      const dump = `cakeSize: ${cakeSize}, cakeType: ${cakeType}, cakeFlavor: ${cakeFlavor}, frostingFlavor: ${frostingFlavor}, frostingType: ${frostingType}, fillingType: ${fillingType}, other: ${other}, fillingFlavor: ${fillingFlavor}, 
      writeInCakeFlavor: ${writeInCakeFlavor}, writeInFrostingFlavor: ${writeInFrostingFlavor}, bows: ${bows}, discoBalls: ${discoBalls}, freshFruit: ${freshFruit}, glitterCherries: ${glitterCherries}, preferences: ${preferences}, imgUrl: ${imgUrl}`;
      console.log("***Error adding cake to database:", err, dump);
    }
    
}

export async function addCustomer( { firstName, lastName, phoneNumber, email } ) {
  try {
    const customer = await sql`
    INSERT INTO Customers
    (first_name, last_name, phone_number, email)
    VALUES (${firstName}, ${lastName}, ${phoneNumber}, ${email}) RETURNING id;
  `
    return customer;
  } catch(err) {
    const dump = `firstName: ${firstName}, lastName: ${lastName}, phoneNumber: ${phoneNumber}, email: ${email}`;
    console.log("***Error adding customer to database:", err, dump);
  }
  
}

export async function addOrder( { customerId, cakeId, date, pickupTime, total } ) {
  try {
    const order = await sql`
    INSERT INTO Orders
    (customer, cake, pickup_date, pickup_time, quote)
    VALUES (${customerId}, ${cakeId}, ${date}, ${pickupTime}, ${total})
  `
  return order;
  } catch(err) {
    const dump = `customerId: ${customerId}, cakeId: ${cakeId}, date: ${date}, pickupTime: ${pickupTime}, total: ${total}`;
    console.log("***Error adding order to database", err, dump);
  }
  
}

export async function addCakeDay( { date, pickupTime } ) {
  try{
    const cake_day = await sql`SELECT * FROM Cake_Days WHERE date = ${date};`;
    if(cake_day.rows.length && cake_day.rows[0].available){
      await sql`UPDATE Cake_Days SET order_count = order_count + 1 WHERE date = ${date};`;
      await sql`UPDATE Cake_Days SET available = order_count < 2 WHERE date = ${date};`;
      await sql`UPDATE Cake_Days SET pickup2 = ${pickupTime}`
    } else {
      if(getDay(date) == 3 || getDay(date) == 4){
        await sql`INSERT INTO Cake_Days (date, order_count, available, pickup1) VALUES (${date}, DEFAULT, false, ${pickupTime});`;
      } else {
        await sql`INSERT INTO Cake_Days (date, order_count, available, pickup1) VALUES (${date}, DEFAULT, DEFAULT, ${pickupTime});`;
      }
    }
  } catch (err) {
    const dump = `date: ${date}, pickupTime: ${pickupTime}`;
    console.log("***Error adding cake day to database:", err, dump);
  }
}

export async function getConfirmedOrdersWithCustomerInfo() {
  unstable_noStore();
  try {
    const confirmedOrdersWithCustomerInfo = await sql`
    SELECT * FROM customers
    JOIN (SELECT * FROM orders WHERE status = 'confirmed') as confirmed_orders
    ON customers.id = confirmed_orders.customer;
    `
    return confirmedOrdersWithCustomerInfo.rows;
  } catch(err) {
    console.log('Something went wrong when fetching confirmed orders:', err);
  }
}