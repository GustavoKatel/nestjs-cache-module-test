import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { createCacheModule } from './cache-helper';

@Injectable()
export class AService {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {
    this.cache.set('a-key', 'asd');
    console.log({ AKeyTTL: this.cache.store.ttl('a-key') });
  }
}

async function createCache(configService: ConfigService) {
  const ttl = Number(configService.get('A_MODULE_TTL'));
  console.log({ AModuleTTL: ttl });
  return {
    ttl,
  };
}

@Module({
  imports: [
    createCacheModule({
      useFactory: createCache,
    }),
  ],
  providers: [AService],
  exports: [AService],
})
export class AModule {}
