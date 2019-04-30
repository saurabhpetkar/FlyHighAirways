module.exports = {
    create: `
            CREATE TABLE IF NOT EXISTS payments (
            id SERIAL PRIMARY KEY,
            reference_string VARCHAR(50) NOT NULL,
            user_id INT NOT NULL,
            amount BIGINT NOT NULL,
            checked BOOLEAN DEFAULT FALSE,
            refund BOOLEAN DEFAULT FALSE
            )
            `,
    exists: `
            SELECT * FROM information_schema.tables 
            WHERE table_schema='public' 
            AND table_name='payments'
            `,
    drop:`
            DROP TABLE IF EXISTS payments RESTRICT
            `,
    dropCascade:`
            DROP TABLE IF EXISTS payments CASCADE
            `,
    findAll:`
            SELECT * FROM payments
            `
};
