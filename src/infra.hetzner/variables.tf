# This file is responsible for declaring the minimal amount of env vars the Hetzner infra needs to boot.
# Set these by exporting TF_VAR_<variable_name>.
# Some of these are injected into the VM user data cloud config scripts.
# These variables are shared between the website server and load test server VMs.
# You copied this to each "child" module.
variable "app_stage" {
  type    = string
  default = "main"

  validation {
    condition     = contains(["main"], var.app_stage)
    error_message = "The environment variable TF_VAR_app_stage must be one of: 'main'."
  }
}

variable "publish_stage" {
  type    = string
  default = "dev"

  validation {
    condition     = contains(["dev", "prod"], var.publish_stage)
    error_message = "The environment variable TF_VAR_publish_stage must be one of: 'dev','prod'."
  }
}

variable "app_location" {
  type    = string
  default = "hosted"
}

variable "hetzner_api_token" {
  type      = string
  default   = ""
  sensitive = true # Requires terraform >= 0.14.

  validation {
    condition     = var.hetzner_api_token != ""
    error_message = "The environment variable TF_VAR_hetzner_api_token must be set."
  }
}

variable "use_prebuilt_development_container_image" {
  type    = string
  default = "false"
}

variable "restrict_to_public_ip" { # Restricts only _dev_ publish stage to your IP.
  type    = string
  default = ""
}

variable "certbot_staging" {
  type    = string
  default = " " # Passed to certot as either " " or "--staging "
}

variable "allow_certbot_traffic" { # The _dev_ publish stage needs to be open to the world temporarily for 80/443 traffic to allow certbot to validate certs via DNS.
  type    = bool
  default = false
}

# Used to clone this source during cloud config.
variable "github_token" {
  type      = string
  default   = ""
  sensitive = true # Requires terraform >= 0.14.

  validation {
    condition     = var.github_token != ""
    error_message = "The environment variable TF_VAR_github_token must be set."
  }
}

# Used to clone this source during cloud config.
variable "meblog_release_version" {
  type    = string
  default = ""

  validation {
    condition     = var.meblog_release_version != ""
    error_message = "The environment variable TF_VAR_meblog_release_version must be set."
  }
}

# Used to clone this source during cloud config.
variable "meblog_private_repo_name" {
  type    = string
  default = ""

  validation {
    condition     = var.meblog_private_repo_name != ""
    error_message = "The environment variable TF_VAR_meblog_private_repo_name must be set."
  }
}

# Used to rsync local -> remote data to.
variable "meblog_registry_directory" {
  type    = string
  default = ""

  validation {
    condition     = var.meblog_registry_directory != ""
    error_message = "The environment variable TF_VAR_meblog_registry_directory must be set."
  }
}

# Used to rsync local -> remote data to.
variable "meblog_media_directory" {
  type    = string
  default = ""

  validation {
    condition     = var.meblog_media_directory != ""
    error_message = "The environment variable TF_VAR_meblog_media_directory must be set."
  }
}
