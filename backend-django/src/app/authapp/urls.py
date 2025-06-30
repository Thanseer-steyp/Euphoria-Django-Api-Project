from django.urls import path
from .views import SignupView, LoginView,UserListView,ProductListByCategory
from .views import ProductDetailView,CategoryListView
from .views import ToggleLikeView, ProductLikeStatus,LikedProductsView
from .views import CartedProductsView,ToggleCartView,CartStatusView
from .views import GenderWiseProductView,ProductSearchAPIView

urlpatterns = [
    path('project-api/', GenderWiseProductView.as_view()),
    path('signup/', SignupView.as_view()),
    path('login/', LoginView.as_view()),
    path('users/', UserListView.as_view(), name='user-list'),
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('category/<int:cat_id>/products/', ProductListByCategory.as_view(), name='category-products'),
    path('category/product/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('category/product/<int:product_id>/like/', ToggleLikeView.as_view(), name='toggle-like'),
    path('category/product/<int:product_id>/like-status/', ProductLikeStatus.as_view(), name='like-status'),
    path('liked-products/', LikedProductsView.as_view(), name='liked-products'),
    path('category/product/<int:product_id>/cart/', ToggleCartView.as_view(), name='toggle-cart'),
    path('carted-products/', CartedProductsView.as_view(), name='carted-products'),
    path('category/product/<int:product_id>/cart-status/', CartStatusView.as_view(), name='cart-status'),
    path('api/products/search/', ProductSearchAPIView.as_view(), name='product-search'),
]
