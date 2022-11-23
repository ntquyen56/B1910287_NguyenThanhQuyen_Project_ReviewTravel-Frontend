
<template>
      <nav class="navbar navbar-expand-md bg-dark navbar-dark">
        <!-- Brand -->
        <a class="navbar-brand" href="#">
            <router-link :to="{ name: 'reviewtravel' }" class="nav-link">
                <img src="../../public/logo.jpg" alt="" width="120" height="40">
            </router-link>
        </a>
      
      
        <!-- Navbar links -->
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
          <!-- <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#">Trang chủ</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Nổi bật</a>
            </li>
          </ul> -->

          <ul class="navbar-nav">
            <li class="nav-item active nameapp">
              <router-link :to="{ name: 'reviewtravel' }" class="nav-link" font-family='Dancing Script'>
                  Địa điểm du lịch nổi tiếng ở Việt Nam
              </router-link>
            </li>
            
          </ul>
        </div>
      </nav>

</template>