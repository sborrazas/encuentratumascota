require.config({
  baseUrl: '/assets',
  paths: {
    jquery: 'http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min',
    async: 'lib/async',
    google_maps_api: 'lib/google_maps_api',
    bootstrap: 'lib/bootstrap.min'
  },
  shim: {
    jquery: { exports: function () { return this.jQuery; } },
    bootstrap: { deps: ['jquery'] }
  }
});