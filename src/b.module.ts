import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { createCacheModule } from './cache-helper';

@Injectable()
export class BService {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {
    this.cache.set('b-key', 'asd');
    console.log({ BKeyTTL: this.cache.store.ttl('b-key') });
  }
}

async function createCache(configService: ConfigService) {
  const ttl = Number(configService.get('B_MODULE_TTL'));
  console.log({ BModuleTTL: ttl });
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
  providers: [BService],
  exports: [BService],
})
export class BModule {}
