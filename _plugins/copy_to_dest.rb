# Thanks to: https://talk.jekyllrb.com/t/including-fontawesome-webfonts-from-node-modules/4486

require "fileutils"

Jekyll::Hooks.register :site, :post_write do |site|
  site.config["copy_to_dest"].each { |copy|
    Jekyll.logger.info "Copying:", "#{copy["source"]} to #{copy["target"]}"
    src = "#{site.source}/#{copy["source"]}"
    dest = "#{site.dest}/#{copy["target"]}"
    FileUtils.mkdir_p dest
    FileUtils.cp_r src, dest
  }
end
