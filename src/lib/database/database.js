const {to} = require('await-to-js')
const {Sequelize, DataTypes} = require('sequelize')
const logger = require('../logger/winston')

const connection = new Sequelize(
    'eCommerce',
    'root',
    'Rj12345@',
    {
        host: 'localhost',
        dialect: "mssql",
        //logging: msg => logger.info(msg)
    }
)

const categoryModel = connection.define('category', {
    id:{
        type: DataTypes.BIGINT(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        notEmpty: true,
        notNull: true
    },
    // description: {
    //     type: DataTypes.STRING,
    //     notEmpty: true,
    //     notNull: true
    // }
})

const productModel = connection.define('products', {
    id: {
        type: DataTypes.BIGINT(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        notEmpty: true,
        notNull: true
    },
    details: {
        type: DataTypes.STRING,
        notEmpty: true,
        notNull: true
    },
    price: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },
    category_id: {
        type: DataTypes.BIGINT(11),
        allowNull: false,
        references: {
            model: categoryModel,
            key: 'id'
        }
    }
})

const attributeModel = connection.define('attributes', {
    id: {
        type: DataTypes.BIGINT(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        notEmpty: true,
        notNull: true
    },
    value: {
        type: DataTypes.STRING,
        notEmpty: true,
        notNull: true
    },
    product_id: {
        type: DataTypes.BIGINT(11),
        allowNull: false,
        references: {
            model: productModel,
            key: 'id'
        }
    }
})

const reviewModel = connection.define('reviews', {
    id: {
        type: DataTypes.BIGINT(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    review: {
        type: DataTypes.STRING,
        notEmpty: true,
        notNull: true
    },
    product_id: {
        type: DataTypes.BIGINT(11),
        allowNull: false,
        references: {
            model: productModel,
            key: 'id'
        }
    }
})

const customerModel = connection.define('customer', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        notEmpty: true,
        notNull: true
    },
    email: {
        type: DataTypes.STRING,
        notEmpty: true,
        notNull: true
    },
    phone: {
        type: DataTypes.BIGINT,
        notEmpty: true,
        notNull: true
    },
    address: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    creditCardNumber: {
        type: DataTypes.BIGINT,
        defaultValue: null
    },
    encryptedPassword: {
        type: DataTypes.STRING,
        notEmpty: true,
        notNull: true
    }
})

const orderModel = connection.define('orders', {
    id: {
        type: DataTypes.BIGINT(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    customer: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: customerModel,
            key: 'username'
        }
    },
    product_id: {
        type: DataTypes.BIGINT(11),
        allowNull: false,
        references: {
            model: productModel,
            key: 'id'
        }
    },
    qty: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
})

const cartItemsModel = connection.define('shoppingCart', {
    id: {
        type: DataTypes.BIGINT(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    customer: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: customerModel,
            key: 'username'
        }
    },
    product_id: {
        type: DataTypes.BIGINT(11),
        allowNull: false,
        references: {
            model: productModel,
            key: 'id'
        }
    },
    qty: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
})

const connect = async () => {
    let [err, result] = await to(connection.sync({alter: true}))
    if (err) {
        logger.error(err.message)
        return
    }
    logger.info('Successfully connected to MySQL server.')
    console.log('Successfully connected to MySQL server.')
}

module.exports = {
    connect,
    categoryModel,
    productModel,
    attributeModel,
    reviewModel,
    customerModel,
    orderModel,
    cartItemsModel
}