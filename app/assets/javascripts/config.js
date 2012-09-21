require.config({
  baseUrl: '/assets',
  paths: {
    jquery: 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min',
    async: 'lib/async',
    google_maps_api: 'lib/google_maps_api'
  },
  shim: {
    jquery: { exports: function () { return this.jQuery; } }
  }
});
