import { sql } from "@vercel/postgres";

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
    } catch(e) {
      console.log(e)
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
  } catch(e) {
    console.log(e)
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
  } catch(e) {
    console.log(e)
  }
  
}

export async function addCakeDay(date) {
  try{
    const cake_day = await sql`SELECT * FROM Cake_days WHERE date = ${date};`;
    if(cake_day.rows.length){
      await sql`UPDATE Cake_Days SET order_count = order_count + 1 WHERE date = ${date};`;
      await sql`UPDATE Cake_Days SET available = order_count < 2 WHERE date = ${date};`;
    } else {
      await sql`INSERT INTO Cake_Days (date, order_count, available) VALUES (${date}, DEFAULT, DEFAULT);`;
    }
  } catch (e) {
    console.log(e)
  }
}