module.exports = {
    create: `
            CREATE TABLE IF NOT EXISTS cities (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            short_form VARCHAR(5) NOT NULL
            )
            `,
    exists: `
            SELECT * FROM information_schema.tables 
            WHERE table_schema='public' 
            AND table_name='cities'
            `,
    drop:`
            DROP TABLE IF EXISTS cities RESTRICT
            `,
    dropCascade:`
            DROP TABLE IF EXISTS cities CASCADE
            `,
    findAll:`
            SELECT * FROM cities
            `
};
