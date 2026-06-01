// write a function to create a users table in your database.
import { Client } from 'pg'
import { config } from 'dotenv'
config()

console.log(process.env.DATABASE_URL);
const client = new Client({
    connectionString: process.env.DATABASE_URL
})

async function main(){
    try{
        await client.connect();
        await createUsersTable();
        await createAddressTable();
    }catch(err){
        console.log(err);
    }finally{
        await client.end();
    }
}
main();

async function createUsersTable() {
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY, 
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("Users table created successfully");    
    } catch (err) {
        console.error("Error during table creation:", err);
    }
}


async function createAddressTable() {
    try {


        await client.query(`
            CREATE TABLE IF NOT EXISTS addresses (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,
                city VARCHAR(100) NOT NULL,
                country VARCHAR(100) NOT NULL,
                street VARCHAR(255) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            );
        `);

        console.log("Addresses table created successfully");
    } catch (err) {
        console.error("Error creating addresses table:", err);
    }
}