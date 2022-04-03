"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "David Bach: Faktor Latte",
          image: "/upload/image 1.png",
          stock: 100,
          price: 90,
          description:
            "inoad hanondokasnkdnjjnb sjnjndwubas njnsadnqdjnjns jnjndjnas danjsnndnwj nsjan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '"Selena" dan "Nebula"',
          image: "/upload/image 2.png",
          stock: 100,
          price: 90,
          description:
            "inoad hanondokasnkdnjjnb sjnjndwubas njnsadnqdjnjns jnjndjnas danjsnndnwj nsjan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pelukis Bisu (The Silent Patient)",
          image: "/upload/image 3.png",
          stock: 100,
          price: 90,
          description:
            "inoad hanondokasnkdnjjnb sjnjndwubas njnsadnqdjnjns jnjndjnas danjsnndnwj nsjan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Kecamuk Darah (Troubled Blood)",
          image: "/upload/image 4.png",
          stock: 100,
          price: 90,
          description:
            "inoad hanondokasnkdnjjnb sjnjndwubas njnsadnqdjnjns jnjndjnas danjsnndnwj nsjan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Kitab Kawin (Edisi Cover Baru)",
          image: "/upload/image 5.png",
          stock: 100,
          price: 90,
          description:
            "inoad hanondokasnkdnjjnb sjnjndwubas njnsadnqdjnjns jnjndjnas danjsnndnwj nsjan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Salvation of a Saint",
          image: "/upload/image 6.png",
          stock: 100,
          price: 90,
          description:
            "inoad hanondokasnkdnjjnb sjnjndwubas njnsadnqdjnjns jnjndjnas danjsnndnwj nsjan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  },
};
