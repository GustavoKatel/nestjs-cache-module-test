import { CacheModule, CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';

export type CreateCacheModuleOptions = CacheModuleAsyncOptions<{
  enabled?: boolean;
}>;

export function createCacheModule(options: CreateCacheModuleOptions) {
  options.inject = [ConfigService, ...(options.inject || [])];

  if (options.useFactory) {
    const inputFactory = options.useFactory;
    options.useFactory = async (configService: ConfigService) => {
      const opts = await inputFactory(configService);
      console.log({ opts });
      return opts;
    };
  }

  return CacheModule.registerAsync(options);
}
