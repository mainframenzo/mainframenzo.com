apt-get install -y \
  software-properties-common --no-install-recommends \
  autoconf \
  automake \
  bison \
  build-essential \
  ca-certificates \
  curl \
  epstool \
  fig2dev \
  flex \
  gperf \
  g++ \
  gcc \
  gzip \
  git \
  gfortran \
  gnupg \
  gnuplot-x11 \
  icoutils \
  less \
  libblas-dev \
  libgtkmm-3.0-dev \
  libgstreamermm-1.0-dev \
  libpangomm-1.4-dev \
  liblapack-dev \
  libpcre3-dev \
  libarpack2-dev \
  libcurl4-gnutls-dev \
  libfftw3-dev \
  lsb-release \
  libfltk1.3-dev \
  libfontconfig1-dev \
  libfreetype6-dev \
  libgl2ps-dev \
  libglpk-dev \
  libreadline-dev \
  libgraphicsmagick++1-dev \
  libhdf5-dev \
  libsndfile1-dev \
  libssl-dev \
  llvm-dev \
  libgl1-mesa-dev \
  libqhull-dev \
  libqrupdate-dev \
  libsuitesparse-dev \
  libxft-dev \
  libcairo2-dev \
  librsvg2-bin \
  libtool \
  libpng-dev \
  libcairo2-dev \
  libjson-c-dev \
  libgtkmm-3.0-dev \
  libpangomm-1.4-dev \
  libgl-dev \
  libglu-dev \
  libspnav-dev \
  libcgal-dev \
  libgtest-dev \
  libtet1.5-dev \
  make \
  portaudio19-dev \
  pstoedit \
  python3 \
  libpython3.6 \
  libpython3.8 \
  openjdk-8-jdk \
  perl \
  python3-venv \
  python3-dev \
  python3-pip \
  python3-pkg-resources \
  python3-virtualenv \
  python3-setuptools \
  qt5-default \
  rsync \
  ssh \
  sudo \
  tar \
  texinfo \
  texlive-latex-extra \
  vim \
  vim-nox \
  virtualenv \
  zlib* \
  zlib1g-dev

pip3 install pipenv

apt-get install -y \
  g++-9 \
  gcc-9

# NOTE 
# cmake has issues installing through package manager so build from source.
wget https://github.com/Kitware/CMake/releases/download/v3.24.1/cmake-3.24.1.tar.gz
tar xf cmake-3.24.1.tar.gz
cd cmake-3.24.1
./bootstrap
make
make install
cmake --version
cd ..

echo -e 'export PATH="/usr/local/bin:$PATH"' >> /root/.bash_profile
export PATH="/usr/local/bin:$PATH"