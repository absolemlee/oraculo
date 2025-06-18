{
  "targets": [
    {
      "target_name": "your_addon",
      "sources": [ "src/addon.cpp" ],
      "include_dirs": [
        // resolves to: /path/to/project/node_modules/.pnpm/nan@X.Y.Z/node_modules/nan
        "<!(node -e \"require('nan')\")"
      ]
      // …any other settings…
    }
  ]
}
