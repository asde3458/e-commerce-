import './configs/env';
import './configs/db';
import bcrypt from 'bcrypt';
import User from './models/user.model';
import ApiKey from './models/api-key.model';
import KeyToken from './models/key-token.model';
import { ObjectId } from 'mongodb';
import { seedProducts } from './seeds/products';
import { seedCategories } from './seeds/categories';
import { seedReviews } from './seeds/reviews';
import { seedUserPayments } from './seeds/user-payments';
import { seedUserAddresses } from './seeds/user-addresses';
import { seedCarts } from './seeds/carts';
import { seedCartItems } from './seeds/cart-items';
import { seedOrders } from './seeds/orders';
import { seedOrderItems } from './seeds/order-items';
import { seedPayments } from './seeds/payments';
import { seedDiscounts } from './seeds/discounts';
import { seedInventories } from './seeds/inventories';

const createSuperAdmin = async () => {
	const superAdmin = await User.findById('67a36f76497df40e9471e299');
	if (superAdmin) return;
	const passwordHash = await bcrypt.hash('123456', 10);
	await User.create({
		_id: new ObjectId('67a36f76497df40e9471e299'),
		name: 'Super Admin',
		email: 'superadmin@gmail.com',
		password: passwordHash,
		roles: ['SUPER_ADMIN', 'ADMIN', 'USER'],
	});
};

const createUser = async () => {
	const user = await User.findById('67a36f77497df40e9471e2a1');
	if (user) return;
	const passwordHash = await bcrypt.hash('password123', 10);
	await User.create({
		_id: new ObjectId('67a36f77497df40e9471e2a1'),
		name: 'John Doe',
		email: 'john.doe@gmail.com',
		password: passwordHash,
		roles: ['USER'],
	});
};

const createApiKey = async () => {
	const apiKey = await ApiKey.findById('67a370be9da19e0604f176c1');
	if (apiKey) return;
	await ApiKey.create({
		_id: new ObjectId('67a370be9da19e0604f176c1'),
		key: 'youAreTrustedByAzzurri',
		permissions: ['0000'],
	});
};

const createKey = async () => {
	const key = await KeyToken.findById('67a37126edd1422231e746cc');
	if (key) return;
	await KeyToken.create({
		_id: new ObjectId('67a37126edd1422231e746cc'),
		user: '67a36f76497df40e9471e299',
		privateKey:
			'34735cc2ee3c231862c20b78f6f83079ab6cc86114df5cb80bca8568727bb6c6079e45b472a837132f67b455c0b94f10b4613a0f44b646889eb91294eaff0d80',
		publicKey:
			'2f2a7a551d28f6b159e29fa6a6ea3194bef257564f2a7260f5620203b03ff049ff0e78c5d7b06206989bffb00c6ec0132a2428cb40e91f1506a953fab17a48ae',
		refreshToken:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2EzNmY3NjQ5N2RmNDBlOTQ3MWUyOTkiLCJlbWFpbCI6InN1cGVyYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNzM4NzY0NTgyLCJleHAiOjE3MzkzNjkzODJ9.fYsjKuDqAGT6f4xBb4DYoImvzLEjSkXUEwRlLtGxrPE',
		refreshTokensUsed: [],
	});
};

const init = async () => {
	try {
		await createSuperAdmin();
		await createApiKey();
		await createUser();
		await createKey();
		await seedProducts();
		await seedCategories();
		await seedReviews();
		await seedUserPayments();
		await seedUserAddresses();
		await seedCarts();
		await seedCartItems();
		await seedOrders();
		await seedOrderItems();
		await seedPayments();
		await seedDiscounts();
		await seedInventories();

		console.log('✅ All seeding completed successfully');
		process.exit(0);
	} catch (error) {
		console.error('❌ Seeding failed:', error);
		process.exit(1);
	}
};

init();
