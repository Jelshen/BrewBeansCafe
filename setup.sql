CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE menus (
    menu_id SERIAL PRIMARY KEY,
    menu_name VARCHAR(100) NOT NULL,
    menu_price NUMERIC(6,2) NOT NULL,
	menu_description TEXT NOT NULL,
    picture_url TEXT,
    category_id INTEGER REFERENCES categories(category_id) ON DELETE CASCADE,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample categories
INSERT INTO categories (name) VALUES ('Coffee'), ('Pastry'), ('Tea'), ('Sandwich');

INSERT INTO menus (menu_name, menu_price, menu_description, picture_url, category_id, is_available) VALUES
-- Coffee (Category 1)
('Espresso', 3.50, 'A concentrated form of coffee served in small, strong shots.', 'espresso.webp', 1, true),
('Croissant', 2.20, 'Flaky, buttery French pastry.', 'croissant.webp', 2, true),
('Peppermint Tea', 2.30, 'Refreshing herbal tea made with peppermint leaves.', 'pepperminttea.webp', 3, true),
('Ham & Cheese Sandwich', 4.00, 'Black forest ham and cheddar cheese with fresh vegetables.', 'hamandcheesesandwich.webp', 4, true)

INSERT INTO menus (menu_name, menu_price, menu_description, picture_url, category_id, is_available) VALUES
-- Coffee (Category 1)
('Espresso', 3.50, 'A concentrated form of coffee served in small, strong shots.', 'espresso.webp', 1, true),
('Cappuccino', 3.00, 'Equal parts espresso, steamed milk, and milk foam.', 'cappuccino.webp', 1, true),
('Latte', 3.50, 'Espresso with steamed milk and a light layer of milk foam.', 'latte.webp', 1, true),
('Americano', 2.75, 'Espresso diluted with hot water.', 'americano.webp', 1, true),
('Flat White', 3.25, 'Espresso with steamed milk and minimal foam.', 'flatwhite.webp', 1, true),

-- Pastries (Category 2)
('Croissant', 2.20, 'Flaky, buttery French pastry.', 'croissant.webp', 2, true),
('Blueberry Muffin', 2.80, 'Moist muffin filled with fresh blueberries.', 'blueberrymuffin.webp', 2, true),
('Cinnamon Roll', 3.00, 'Soft roll with cinnamon-sugar filling and cream cheese frosting.', 'cinnamonroll.webp', 2, true),
('Chocolate Danish', 3.10, 'Flaky pastry filled with rich chocolate.', 'chocolatedanish.webp', 2, true),
('Banana Bread', 2.90, 'Moist bread made with ripe bananas and walnuts.', 'bananabread.webp', 2, true),

-- Tea (Category 3)
('Green Tea', 2.00, 'Classic Japanese green tea with a subtle, earthy flavor.', 'greentea.webp', 3, true),
('Earl Grey', 2.50, 'Black tea flavored with oil of bergamot.', 'earlgrey.webp', 3, true),
('Chamomile Tea', 2.40, 'Caffeine-free herbal tea with calming properties.', 'chamomiletea.webp', 3, true),
('Oolong Tea', 2.60, 'Traditional Chinese tea with a rich, complex flavor.', 'oolongtea.webp', 3, true),
('Peppermint Tea', 2.30, 'Refreshing herbal tea made with peppermint leaves.', 'pepperminttea.webp', 3, true),

-- Sandwiches (Category 4)
('Turkey Sandwich', 4.50, 'Sliced turkey with lettuce, tomato, and mayo on whole grain bread.', 'turkeysandwich.webp', 4, true),
('Ham & Cheese Sandwich', 4.00, 'Black forest ham and cheddar cheese with fresh vegetables.', 'hamandcheesesandwich.webp', 4, true),
('Veggie Sandwich', 3.75, 'Fresh vegetables and hummus on artisan bread.', 'veggiesandwich.webp', 4, true),
('Grilled Cheese', 3.50, 'Melted blend of cheeses on buttery toasted bread.', 'grilledcheese.webp', 4, true),
('Chicken Panini', 5.00, 'Grilled chicken with pesto and mozzarella on pressed ciabatta.', 'chickenpanini.webp', 4, true);

SELECT * FROM menus;
SELECT * FROM categories;