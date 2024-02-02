import Order from "../../domain/entity/order";
import OrderItemModel from "../db/sequelize/model/order_item.model";
import OrderModel from "../db/sequelize/model/order.model";
import OrderRepositoryInterface from "../../domain/repository/order.repository.interface";
import OrderItem from "../../domain/entity/order_item";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
  async update(entity: Order): Promise<void> {
    const order = await OrderModel.findOne({ where: { id: entity.id }, include: [OrderItemModel] });

    if (!order) {
        throw new Error(`Order with id ${entity.id} not found`);
    }

    order.customer_id = entity.customerId;
    order.total = entity.total();

    await order.save();

    for (const item of entity.items) {
        const orderItem = order.items.find(i => i.id === item.id);

        if (!orderItem) {
            throw new Error(`Order item with id ${item.id} not found`);
        }
        orderItem.name = item.name;
        orderItem.price = item.price;
        orderItem.product_id = item.productId;
        orderItem.quantity = item.quantity;

        await orderItem.save();
    };
};

  async find(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({ 
        where: { id: id },
        include: [OrderItemModel],
        rejectOnEmpty: true
      });
      
    } catch (error) {
      throw new Error("Could not get order");
    }
    let orderItems: OrderItem[] = [];

    orderModel.items.forEach(item => {
      let orderItem = new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
      orderItems.push(orderItem)      
    });
    const order = new Order(id, orderModel.customer_id, orderItems);
    return order
  };
  
  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({ include: [OrderItemModel] });
    let orders: Order[] = [];
    orderModels.forEach(orderModel => {
      let orderItems: OrderItem[] = [];
      orderModel.items.forEach(item => {
        let orderItem = new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
        orderItems.push(orderItem)      
      });
      let order = new Order(orderModel.id, orderModel.customer_id, orderItems);
      orders.push(order);
    });
    return orders;
  }
}