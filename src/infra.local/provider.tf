# References: 
# * https://dev.to/todoroff/terraform-for-local-vms-a-modern-alternative-to-vagrant-3j23
terraform {
  required_providers {
    multipass = {
      source  = "todoroff/multipass"
      version = "~> 1.5"
    }
  }
}

provider "multipass" {
  # Increase timeout for commands (default 120s).
  command_timeout = 600
}

provider "tls" {}