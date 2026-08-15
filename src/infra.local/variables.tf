# This file is responsible for declaring the minimal amount of env vars the local infra needs to boot.
# Set these by exporting TF_VAR_<variable_name>.
# Some of these are injected into the VM user data cloud config script.
variable "app_stage" {
  type    = string
  default = "main"

  validation {
    condition     = contains(["local"], var.app_stage)
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
  default = "local"
}

variable "use_prebuilt_development_container_image" {
  type    = string
  default = "false"
}

variable "restrict_to_public_ip" { # Not used for local VM deployment.
  type    = string
  default = ""
}

# Used to clone this source during cloud config.
variable "github_token" {
  type    = string
  default = ""

  validation {
    condition     = var.github_token != ""
    error_message = "The environment variable TF_VAR_github_token must be set."
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
