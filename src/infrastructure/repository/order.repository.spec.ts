import { Sequelize } from "sequelize-typescript";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import Product from "../../domain/entity/product";
import CustomerModel from "../../infrastructure/db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";
import ProductModel from "../../infrastructure/db/sequelize/model/product.model";
import ProductRepository from "./product.repository";
import OrderItemModel from "../../infrastructure/db/sequelize/model/order_item.model";
import OrderModel from "../../infrastructure/db/sequelize/model/order.model";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  it("should update an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.Address = address;
    await customerRepository.create(customer);
  
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);
  
    const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
    const order = new Order("123", "123", [orderItem]);
  
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: 'Product 1',
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });

    orderItem.changeProductName("Shampoo");
    order.changeItems([orderItem]);

    await orderRepository.update(order);

    const updatedOrderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(updatedOrderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: "Shampoo",
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

    it("should find order by id", async () => {
      const customerRepository = new CustomerRepository();
      const customer = new Customer("123", "Customer 1");
      const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
      customer.Address = address;
      await customerRepository.create(customer);
    
      const productRepository = new ProductRepository();
      const product = new Product("123", "Product 1", 10);
      await productRepository.create(product);
    
      const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
      const order = new Order("123", "123", [orderItem]);
    
      const orderRepository = new OrderRepository();
      await orderRepository.create(order);

      const findOrder = await orderRepository.find("123")

      expect(findOrder).toEqual(order)
  });
  it("should find all order", async() => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.Address = address;
    await customerRepository.create(customer);
  
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);
  
    const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
    const order = new Order("123", "123", [orderItem]);
  
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
  
    const orders = await orderRepository.findAll();
  
    expect(orders).toEqual(expect.arrayContaining([order]));
  })
  });

