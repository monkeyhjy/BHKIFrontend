<<<<<<< Updated upstream
module.exports = {
	devServer: {
		// open: true,
		// host: 'localhost',
		// port: 8081,
		// https: false,
		//以上的ip和端口是我们本机的;下面为需要跨域的
		proxy: {  //配置跨域
			'/apis': {
				target: 'http://182.92.239.145/apis/',  //这里后台的地址模拟的;应该填写你们真实的后台接口
				ws: true,
				changOrigin: true,  //允许跨域
				pathRewrite: {
					'^/apis': ''  //请求的时候使用这个api就可以
				}
			}
		}
	}
=======
module.exports = {
	devServer: {
		// open: true,
		// host: 'localhost',
		// port: 8081,
		// https: false,
		//以上的ip和端口是我们本机的;下面为需要跨域的
		proxy: {  //配置跨域
			'/apis': {
				// target: 'http://182.92.239.145/apis/',  //这里后台的地址模拟的;应该填写你们真实的后台接口
				target:'http://49.234.51.41/apis/',
				ws: true,
				changOrigin: true,  //允许跨域
				pathRewrite: {
					'^/apis': ''  //请求的时候使用这个api就可以
				}
			}
		}
	}
>>>>>>> Stashed changes
}