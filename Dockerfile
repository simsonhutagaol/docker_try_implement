# Gunakan Node.js versi terbaru
FROM node:20

# Set working directory di container
WORKDIR /usr/src/app

# Salin file dependensi
COPY package.json ./

# Instal dependensi
RUN npm install

# Salin semua file proyek
COPY . .

# Expose port yang digunakan aplikasi
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]
