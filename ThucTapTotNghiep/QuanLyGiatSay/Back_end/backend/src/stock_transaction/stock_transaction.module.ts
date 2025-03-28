import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StockTransactionController } from './stock_transaction.controller';
import { StockTransactionRepository } from './stock_transaction.repository';
import { StockTransactionService } from './stock_transaction.service';
import { StockTransaction, StockTransactionSchema } from './model/stock_transaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: StockTransaction.name, schema: StockTransactionSchema }]),
  ],
  controllers: [StockTransactionController],
  providers: [StockTransactionService, StockTransactionRepository],
  exports: [StockTransactionService, StockTransactionRepository],
})
export class StockTransactionModule {}
