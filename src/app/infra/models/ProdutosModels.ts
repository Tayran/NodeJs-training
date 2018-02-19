import * as Sequelize from 'sequelize';

import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface ProdutosAttributes {
    id?: number;
    titulo?: string;
    descricao?: string;
    preco?: number;
}

export interface ProdutosInstance extends Sequelize.Instance<ProdutosAttributes> {}

export interface ProdutosModel extends Sequelize.Model<ProdutosInstance, ProdutosAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): ProdutosModel => {

    const Produtos: ProdutosModel = sequelize.define('Produtos', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        titulo: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        descricao: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        preco : {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        }
    }, {
        tableName: 'produtos',
        timestamps: false
    });

    return Produtos;

};