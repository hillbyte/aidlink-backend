-- Drop tables if they exist
DROP TABLE IF EXISTS donations;
DROP TABLE IF EXISTS centers;
DROP TABLE IF EXISTS volunteers;
DROP TABLE IF EXISTS contacts;

-- Create tables
CREATE TABLE centers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  zip VARCHAR(20) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(255),
  hours TEXT,
  accepts_clothing BOOLEAN DEFAULT TRUE,
  accepts_accessories BOOLEAN DEFAULT FALSE,
  accepts_household BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE donations (
  id SERIAL PRIMARY KEY,
  donor_name VARCHAR(255) NOT NULL,
  donor_email VARCHAR(255) NOT NULL,
  donor_phone VARCHAR(20),
  donation_type VARCHAR(50) NOT NULL,
  items_description TEXT NOT NULL,
  quantity INTEGER,
  condition VARCHAR(50) NOT NULL,
  pickup_required BOOLEAN DEFAULT FALSE,
  pickup_address TEXT,
  pickup_city VARCHAR(100),
  pickup_state VARCHAR(100),
  pickup_zip VARCHAR(20),
  preferred_date DATE,
  preferred_time VARCHAR(50),
  center_id INTEGER REFERENCES centers(id),
  status VARCHAR(50) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE volunteers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  zip VARCHAR(20),
  availability TEXT,
  skills TEXT,
  interests TEXT,
  previous_experience TEXT,
  preferred_center_id INTEGER REFERENCES centers(id),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  responded BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample centers
INSERT INTO centers (name, address, city, state, zip, phone, email, hours, accepts_clothing, accepts_accessories, accepts_household)
VALUES 
  ('Community Aid Center', '123 Main St', 'Springfield', 'IL', '62701', '217-555-1234', 'info@communityaid.org', 'Mon-Fri: 9am-5pm, Sat: 10am-3pm', true, true, true),
  ('Hope Donation Hub', '456 Oak Ave', 'Chicago', 'IL', '60601', '312-555-6789', 'donations@hopehub.org', 'Mon-Sat: 8am-8pm', true, true, false),
  ('Helping Hands', '789 Pine Blvd', 'Peoria', 'IL', '61602', '309-555-4321', 'contact@helpinghands.org', 'Tue-Sun: 10am-6pm', true, false, true);
