$compress = @{
	LiteralPath = "icons", "manifest.json", "login-blocker.js"
	CompressionLevel = "Fastest"
	DestinationPath = "twitter-login-blocker.zip"
}

Compress-Archive @compress
