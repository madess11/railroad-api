import sharp from 'sharp'
import { Request } from 'express'
import path from 'path'
import fs from 'fs'

// Function to resize image to 200x200px
export const resizeImage = async (filePath: string): Promise<void> => {
  try {
    await sharp(filePath)
      .resize(200, 200)  // Resize to 200x200 pixels
      .toFile(filePath.replace(/(\.\w+)$/, '_resized$1'))  // Save resized image with "_resized" suffix
  } catch (error) {
    throw new Error(`Failed to resize image: ${error }`)
  }
}

// Function to save image to a specified directory
export const saveImage = async (req: Request, uploadDir: string): Promise<string> => {
  if (!req.file) {
    throw new Error('No file uploaded')
  }

  const imageName = `${Date.now()}_${req.file.originalname}`
  const imagePath = path.join(uploadDir, imageName)

  // Ensure directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }

  fs.writeFileSync(imagePath, req.file.buffer)  // Save image to disk

  return imagePath
}
