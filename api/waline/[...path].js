// Vercel Serverless Function: Waline 代理
// 将 /api/waline/* 请求代理到 Waline 服务

const WALINE_SERVER = 'https://waline-server-eight-psi.vercel.app';

export default async function handler(req, res) {
  // 获取路径参数
  const path = req.query.path || [];
  const apiPath = Array.isArray(path) ? path.join('/') : path;
  const targetPath = apiPath ? `/${apiPath}` : '/';
  
  // 构建查询参数（排除path参数）
  const queryParams = new URLSearchParams();
  Object.keys(req.query).forEach(key => {
    if (key !== 'path') {
      queryParams.append(key, req.query[key]);
    }
  });
  const queryString = queryParams.toString();
  const query = queryString ? `?${queryString}` : '';
  const targetUrl = `${WALINE_SERVER}${targetPath}${query}`;
  
  try {
    // 准备请求选项
    const fetchOptions = {
      method: req.method,
      headers: {
        'User-Agent': req.headers['user-agent'] || 'Vercel-Proxy',
      },
    };
    
    // 转发Content-Type头
    if (req.headers['content-type']) {
      fetchOptions.headers['Content-Type'] = req.headers['content-type'];
    }
    
    // 转发Authorization头（如果存在）
    if (req.headers['authorization']) {
      fetchOptions.headers['Authorization'] = req.headers['authorization'];
    }
    
    // 对于POST/PUT等请求，转发请求体
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      fetchOptions.body = typeof req.body === 'string' 
        ? req.body 
        : JSON.stringify(req.body);
    }
    
    // 发送请求
    const response = await fetch(targetUrl, fetchOptions);
    
    // 获取响应数据
    const data = await response.text();
    
    // 设置响应头
    const contentType = response.headers.get('content-type');
    if (contentType) {
      res.setHeader('Content-Type', contentType);
    }
    
    // 设置CORS头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // 处理OPTIONS请求
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    
    // 返回响应
    res.status(response.status).send(data);
  } catch (error) {
    console.error('Waline proxy error:', error);
    res.status(500).json({ 
      error: 'Proxy error', 
      message: error.message 
    });
  }
}

