import Database from 'better-sqlite3';
import { dev } from '$app/environment';

const db = new Database(dev ? 'dev.db' : 'production.db');

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    goal_amount INTEGER NOT NULL,
    current_amount INTEGER DEFAULT 0,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS donations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    mpesa_transaction_id TEXT,
    phone_number TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects (id)
  );

  CREATE INDEX IF NOT EXISTS idx_donations_project_id ON donations(project_id);
  CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);
`);

// Prepared statements
export const statements = {
  // Projects
  getAllProjects: db.prepare('SELECT * FROM projects ORDER BY created_at DESC'),
  getProjectById: db.prepare('SELECT * FROM projects WHERE id = ?'),
  createProject: db.prepare(`
    INSERT INTO projects (title, description, goal_amount, image_url)
    VALUES (?, ?, ?, ?)
  `),
  updateProject: db.prepare(`
    UPDATE projects 
    SET title = ?, description = ?, goal_amount = ?, image_url = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `),
  deleteProject: db.prepare('DELETE FROM projects WHERE id = ?'),
  updateProjectAmount: db.prepare(`
    UPDATE projects 
    SET current_amount = (
      SELECT COALESCE(SUM(amount), 0) 
      FROM donations 
      WHERE project_id = ? AND status = 'completed'
    )
    WHERE id = ?
  `),

  // Donations
  getAllDonations: db.prepare(`
    SELECT d.*, p.title as project_title 
    FROM donations d 
    JOIN projects p ON d.project_id = p.id 
    ORDER BY d.created_at DESC
  `),
  getDonationsByProject: db.prepare(`
    SELECT * FROM donations 
    WHERE project_id = ? 
    ORDER BY created_at DESC
  `),
  createDonation: db.prepare(`
    INSERT INTO donations (project_id, amount, phone_number, mpesa_transaction_id, status)
    VALUES (?, ?, ?, ?, ?)
  `),
  updateDonationStatus: db.prepare(`
    UPDATE donations 
    SET status = ?, mpesa_transaction_id = ?
    WHERE id = ?
  `),
  getDonationById: db.prepare('SELECT * FROM donations WHERE id = ?'),
  getDonationByMpesaId: db.prepare('SELECT * FROM donations WHERE mpesa_transaction_id = ?')
};

// Seed data for development
if (dev) {
  const projectCount = statements.getAllProjects.all().length;
  if (projectCount === 0) {
    console.log('Seeding database with sample projects...');

    const sampleProjects = [
      {
        title: 'Clean Water for Rural Communities',
        description: 'Help us build water wells and provide clean drinking water to remote villages. Your donation will directly fund the construction of boreholes and water purification systems.',
        goal_amount: 500000, // 5000 KES
        image_url: '/images/water-project.jpg'
      },
      {
        title: 'Education Support for Orphans',
        description: 'Support education for orphaned children by funding school fees, uniforms, and learning materials. Every donation helps a child stay in school.',
        goal_amount: 300000, // 3000 KES
        image_url: '/images/education-project.jpg'
      },
      {
        title: 'Food Security Initiative',
        description: 'Combat hunger in underserved communities by providing nutritious meals and supporting local food production programs.',
        goal_amount: 750000, // 7500 KES
        image_url: '/images/food-project.jpg'
      }
    ];

    for (const project of sampleProjects) {
      statements.createProject.run(
        project.title,
        project.description,
        project.goal_amount,
        project.image_url
      );
    }

    console.log('Sample projects created successfully!');
  }
}

export default db;
