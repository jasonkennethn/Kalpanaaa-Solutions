from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Project, Subscriber, ContactMessage
from .serializers import ProjectSerializer, SubscriberSerializer, ContactMessageSerializer
import json
import random

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by('-created_at')
    serializer_class = ProjectSerializer

    def perform_create(self, serializer):
        prompt = self.request.data.get('prompt', '').lower()
        category = self.request.data.get('category', 'Dashboard')
        title = self.request.data.get('title', '')

        # Fallback title if none provided
        if not title:
            words = prompt.split()
            title = " ".join(words[:3]).title() if words else f"AI {category}"
            if not title:
                title = f"AI {category}"

        # Default components & code block depending on prompt keywords
        theme_color = "#3b82f6"  # Blue
        bg_gradient = "linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)"
        secondary_color = "#10b981"  # Emerald

        # Determine theme base on keywords
        if "crypto" in prompt or "finance" in prompt or "bank" in prompt:
            theme_color = "#f59e0b"  # Amber/Gold
            secondary_color = "#8b5cf6"  # Purple
            category = "Dashboard"
            preview_data = {
                "theme": {"primary": theme_color, "secondary": secondary_color, "background": bg_gradient},
                "components": [
                    {"type": "stat_card", "title": "Total Balance", "value": "$48,259.04", "change": "+14.8%", "trend": "up"},
                    {"type": "stat_card", "title": "Active Investments", "value": "$12,480.00", "change": "-2.1%", "trend": "down"},
                    {"type": "chart", "title": "Portfolio Performance (BTC/ETH/USDT)", "data": [45, 52, 49, 60, 58, 65, 70]},
                    {"type": "list", "title": "Recent Assets traded", "items": ["Bitcoin (BTC) - Buy", "Ethereum (ETH) - Transfer", "Solana (SOL) - Staked"]}
                ]
            }
            code_html = """<div class="crypto-dashboard">
  <header class="db-header">
    <h2>Crypto Portfolio</h2>
    <span class="status-pill live">Live Rates</span>
  </header>
  <div class="db-stats">
    <div class="stat-card">
      <p class="stat-label">Total Balance</p>
      <h3>$48,259.04</h3>
      <span class="trend up">+14.8% this week</span>
    </div>
    <div class="stat-card">
      <p class="stat-label">Active Investments</p>
      <h3>$12,480.00</h3>
      <span class="trend down">-2.1% this week</span>
    </div>
  </div>
  <div class="db-chart-placeholder">
    <div class="chart-bar" style="height: 45%;"></div>
    <div class="chart-bar" style="height: 52%;"></div>
    <div class="chart-bar" style="height: 60%;"></div>
    <div class="chart-bar" style="height: 65%;"></div>
    <div class="chart-bar" style="height: 70%;"></div>
  </div>
</div>"""
            code_css = """.crypto-dashboard { padding: 24px; color: #fff; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 16px; backdrop-filter: blur(16px); }
.db-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.db-header h2 { font-size: 20px; font-weight: 600; color: #f59e0b; }
.status-pill { background: rgba(245, 158, 11, 0.2); color: #f59e0b; padding: 4px 12px; border-radius: 20px; font-size: 12px; }
.db-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
.stat-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 16px; border-radius: 12px; }
.stat-label { font-size: 12px; color: #94a3b8; margin-bottom: 8px; }
.stat-card h3 { font-size: 24px; font-weight: bold; margin-bottom: 8px; }
.trend.up { color: #10b981; font-size: 12px; }
.trend.down { color: #ef4444; font-size: 12px; }
.db-chart-placeholder { display: flex; align-items: flex-end; justify-content: space-between; height: 120px; background: rgba(255,255,255,0.01); border-radius: 12px; padding: 16px; }
.chart-bar { width: 14%; background: linear-gradient(180deg, #f59e0b, rgba(245,158,11,0.2)); border-radius: 4px; transition: height 0.6s ease; }"""

        elif "health" in prompt or "fitness" in prompt or "gym" in prompt or "fit" in prompt:
            theme_color = "#10b981"  # Green / Emerald
            secondary_color = "#3b82f6"  # Blue
            category = "Dashboard"
            preview_data = {
                "theme": {"primary": theme_color, "secondary": secondary_color, "background": bg_gradient},
                "components": [
                    {"type": "stat_card", "title": "Steps Walked", "value": "10,248 / 12,000", "change": "85.4% goal achieved", "trend": "up"},
                    {"type": "stat_card", "title": "Calories Burned", "value": "642 kcal", "change": "+8.2% vs yesterday", "trend": "up"},
                    {"type": "chart", "title": "Weekly Active Minutes", "data": [30, 45, 60, 20, 80, 95, 50]},
                    {"type": "list", "title": "Daily Workout Plan", "items": ["Morning Run (5k)", "Upper Body Resistance Training", "Hydration Target - 3L"]}
                ]
            }
            code_html = """<div class="fit-dashboard">
  <header class="fit-header">
    <h2>FitLife Activity Tracker</h2>
    <span class="active-tag">Active State</span>
  </header>
  <div class="fit-stats">
    <div class="fit-card green">
      <h4>Steps Walked</h4>
      <div class="metric">10,248</div>
      <div class="subtext">85% of target</div>
    </div>
    <div class="fit-card orange">
      <h4>Calories Burned</h4>
      <div class="metric">642 kcal</div>
      <div class="subtext">Daily burn count</div>
    </div>
  </div>
  <div class="fit-progress-bar">
    <div class="progress-fill" style="width: 85%;"></div>
  </div>
</div>"""
            code_css = """.fit-dashboard { padding: 24px; color: #fff; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 16px; backdrop-filter: blur(16px); }
.fit-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.fit-header h2 { font-size: 20px; font-weight: 600; color: #10b981; }
.active-tag { background: rgba(16, 185, 129, 0.2); color: #10b981; padding: 4px 12px; border-radius: 20px; font-size: 11px; }
.fit-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
.fit-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 16px; border-radius: 12px; }
.fit-card h4 { font-size: 13px; color: #94a3b8; margin: 0 0 8px 0; }
.metric { font-size: 24px; font-weight: bold; color: #fff; }
.subtext { font-size: 12px; color: #64748b; margin-top: 4px; }
.fit-progress-bar { width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden; }
.progress-fill { height: 100%; background: #10b981; border-radius: 4px; }"""

        elif "store" in prompt or "commerce" in prompt or "shop" in prompt or "buy" in prompt:
            theme_color = "#ec4899"  # Pink / Cyberpunk
            secondary_color = "#f43f5e"  # Rose
            category = "E-Commerce"
            preview_data = {
                "theme": {"primary": theme_color, "secondary": secondary_color, "background": bg_gradient},
                "components": [
                    {"type": "stat_card", "title": "Store Conversion", "value": "3.42%", "change": "+0.8% spikes", "trend": "up"},
                    {"type": "stat_card", "title": "Total Sales Revenue", "value": "$18,520.00", "change": "+22.5% vs MoM", "trend": "up"},
                    {"type": "list", "title": "Top Selling Products", "items": ["Hyper X Mechanical Keyboard - 12 items", "OLED UltraWide Display - 4 items", "Ergonomic Mesh Chair - 8 items"]}
                ]
            }
            code_html = """<div class="shop-showcase">
  <div class="shop-header">
    <h3>CyberShop Digital Products</h3>
    <span class="badge">Sale active</span>
  </div>
  <div class="products-grid">
    <div class="product-item">
      <div class="prod-img">⌨️</div>
      <h5>Hyper X Keyboard</h5>
      <span class="price">$149.00</span>
      <button class="buy-btn">Quick Add</button>
    </div>
    <div class="product-item">
      <div class="prod-img">🖥️</div>
      <h5>OLED Curved Monitor</h5>
      <span class="price">$899.00</span>
      <button class="buy-btn">Quick Add</button>
    </div>
  </div>
</div>"""
            code_css = """.shop-showcase { padding: 24px; color: #fff; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; backdrop-filter: blur(16px); }
.shop-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.shop-header h3 { font-size: 18px; color: #ec4899; }
.badge { background: rgba(236, 72, 153, 0.2); color: #ec4899; padding: 4px 10px; border-radius: 20px; font-size: 11px; }
.products-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.product-item { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 16px; text-align: center; }
.prod-img { font-size: 32px; margin-bottom: 12px; }
.product-item h5 { font-size: 14px; margin: 0 0 8px 0; font-weight: 500; }
.price { display: block; font-weight: bold; color: #ec4899; margin-bottom: 12px; font-size: 15px; }
.buy-btn { width: 100%; border: none; outline: none; background: #ec4899; color: #fff; padding: 6px 12px; border-radius: 6px; font-size: 12px; cursor: pointer; transition: opacity 0.2s; }
.buy-btn:hover { opacity: 0.9; }"""

        else:
            # Default: General Analytics SaaS Dashboard
            theme_color = "#3b82f6"  # Premium Indigo Blue
            secondary_color = "#06b6d4"  # Cyan
            category = "Dashboard"
            preview_data = {
                "theme": {"primary": theme_color, "secondary": secondary_color, "background": bg_gradient},
                "components": [
                    {"type": "stat_card", "title": "Monthly Active Users", "value": "12,850", "change": "+18.2% vs last month", "trend": "up"},
                    {"type": "stat_card", "title": "API Response Rate", "value": "99.98%", "change": "+0.02% uptime spike", "trend": "up"},
                    {"type": "chart", "title": "Server Performance (Requests/sec)", "data": [24, 30, 42, 38, 55, 60, 52]},
                    {"type": "list", "title": "System Active Instances", "items": ["US-EAST Node 1: Normal", "EU-CENTRAL Node 2: Heavy Load", "AP-SOUTH Node 1: Normal"]}
                ]
            }
            code_html = """<div class="saas-dashboard">
  <div class="db-header">
    <h3>KALPANAA AI Console</h3>
    <span class="badge active">Syncing</span>
  </div>
  <div class="db-metrics">
    <div class="metric-card">
      <div class="card-title">Active Consumers</div>
      <div class="value">12,850</div>
      <div class="growth">+18.2% MoM</div>
    </div>
    <div class="metric-card">
      <div class="card-title">Average Latency</div>
      <div class="value">24ms</div>
      <div class="growth positive">Optimal</div>
    </div>
  </div>
  <div class="progress-bar-container">
    <div class="progress-filled" style="width: 78%;"></div>
  </div>
</div>"""
            code_css = """.saas-dashboard { padding: 24px; color: #fff; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 16px; backdrop-filter: blur(20px); }
.db-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.db-header h3 { font-size: 18px; color: #3b82f6; font-weight: 600; }
.badge.active { background: rgba(59, 130, 246, 0.2); color: #3b82f6; padding: 4px 12px; border-radius: 20px; font-size: 11px; }
.db-metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
.metric-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 16px; }
.card-title { font-size: 12px; color: #94a3b8; margin-bottom: 8px; }
.metric-card .value { font-size: 24px; font-weight: bold; margin-bottom: 4px; }
.growth { font-size: 12px; color: #10b981; }
.growth.positive { color: #06b6d4; }
.progress-bar-container { width: 100%; height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden; }
.progress-filled { height: 100%; background: linear-gradient(90deg, #3b82f6, #06b6d4); }"""

        # Set calculated preview values onto serializer input data
        serializer.validated_data['title'] = title
        serializer.validated_data['category'] = category
        serializer.validated_data['preview_data'] = json.dumps(preview_data)
        serializer.validated_data['code_html'] = code_html
        serializer.validated_data['code_css'] = code_css

        serializer.save()

@api_view(['POST'])
def subscribe_view(request):
    serializer = SubscriberSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"success": True, "message": "Subscribed successfully!"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def contact_view(request):
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"success": True, "message": "Message received! We will be in touch shortly."}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
