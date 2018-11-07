import { Service } from './service';
import Util from 'services/utils';

// Hands out hostnames to the rest of the app. Eventually
// we should allow overriding this value. But for now we
// are just keeping the value in one place.
export class HostsService extends Service {

  get streamlabs() {
    if (Util.useLocalHost()) {
      return 'streamlabs.site';
    }
    return 'vurteau.com';
  }

  get overlays() {
    if (Util.isPreview()) {
      return 'beta-overlays.vurteau.com';
    }
    return 'overlays.vurteau.com';
  }

  get media() {
    return 'media.vurteau.com';
  }

  get beta2() {
    return 'beta2.vurteau.com';
  }

  get beta3() {
    return 'beta3.vurteau.com';
  }

  get facemaskCDN() {
    return 'facemasks-cdn.vurteau.com/';
  }

  get io() {
    if (Util.useLocalHost()) {
      return 'http://io.streamlabs.site:4567';
    }
    return 'https://aws-io.vurteau.com';
  }

  get cdn() {
    return 'cdn.vurteau.com';
  }

  get platform() {
    return 'platform.vurteau.com';
  }

}
