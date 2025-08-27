import mongoose from 'mongoose';

// Function to generate URL-friendly slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim('-'); // Remove leading/trailing hyphens
};

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true }, // URL-friendly version of title
  author: { type: String, default: 'Admin' },
  content: { type: String, required: true },
  coverImage: { type: String },
  tags: [String],
  status: { type: String, default: 'New' },
  dateAdded: { type: Date, default: Date.now },
});

// Pre-save middleware to generate slug from title
blogSchema.pre('save', async function (next) {
  if (this.isModified('title') || this.isNew) {
    let baseSlug = generateSlug(this.title);
    let slug = baseSlug;
    let counter = 1;

    // Check if slug already exists and make it unique
    while (
      await mongoose.models.Blog.findOne({ slug, _id: { $ne: this._id } })
    ) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    this.slug = slug;
  }
  next();
});

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
