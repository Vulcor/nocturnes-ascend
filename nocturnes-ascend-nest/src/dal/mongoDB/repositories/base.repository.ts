import {
  Document,
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
  UpdateResult,
} from 'mongoose';

export abstract class BaseRepository<T extends Document> {
  protected constructor(protected readonly model: Model<T>) {}

  public async getById(id: any, lean?: boolean): Promise<T | null> {
    return this.model.findOne({ _id: id }, {}, { lean });
  }

  public async create(createDocumentData: T): Promise<T> {
    const doc = new this.model(createDocumentData);
    return doc.save();
  }

  public async delete(id: string): Promise<T> {
    return this.model.findOneAndDelete({ _id: id });
  }

  public async findOneAndUpdate(
    filter?: FilterQuery<T>,
    update?: UpdateQuery<T> | UpdateWithAggregationPipeline,
    options?: QueryOptions<T> | null,
  ): Promise<T | null> {
    return this.model.findOneAndUpdate(filter, update, { new: true, ...options }).exec();
  }

  public async updateMany(
    filter?: FilterQuery<T>,
    update?: UpdateQuery<T> | UpdateWithAggregationPipeline,
    options?: QueryOptions<T> | null | any,
  ): Promise<UpdateResult> {
    return this.model.updateMany(filter, update, options).exec();
  }

  public async findOne(
    filter?: FilterQuery<T>,
    projection?: Record<string, unknown>,
    options?: QueryOptions<T> | null,
  ): Promise<T | null> {
    return this.model.findOne(filter, projection, options).exec();
  }

  public async find(
    filter?: FilterQuery<T>,
    projection?: ProjectionType<T> | null,
    limit?: number,
  ): Promise<T[] | null> {
    return this.model.find(filter, projection).limit(limit).exec();
  }

  public async findWithPopulate(filter?: FilterQuery<T>, populate?: string[], limit?: number): Promise<Array<T>> {
    return this.model.find(filter).limit(limit).populate(populate).exec();
  }

  public async count(filter?: FilterQuery<T>) {
    return this.model.countDocuments(filter).exec();
  }

  public async deleteMany(filter?: FilterQuery<T>, options?: QueryOptions<T> | any): Promise<any> {
    return this.model.deleteMany(filter, options);
  }
}
